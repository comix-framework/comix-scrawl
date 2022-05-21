import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { NettruyenEvents } from '@site/nettruyen/enums/events'
import { NettruyenQueue } from '@site/nettruyen/enums/queue'
import { CrawlStoryNettruyenDto } from '@site/nettruyen/dto/crawl-story.dto'
import { TargetDocument } from '@schema/targets/entities/target.entity'
import { PostDocument } from '@schema/posts/entities/post.entity'
import { CrawChapterNettruyenDto } from '@site/nettruyen/dto/crawl-chapter.dto'

@Injectable()
export class NettruyenListeners {
  private readonly logger = new Logger(NettruyenListeners.name)

  constructor(
    private readonly nettruyenService: NettruyenService,
    private readonly targetsService: TargetsService,
    private readonly postsService: PostsService,
    private eventEmitter: EventEmitter2,
    @InjectQueue(NettruyenQueue.NAME) private queue: Queue
  ) {}

  /**
   * Sự kiện được chạy khi crawl truyện
   * Function sẽ thự hiện
   * 1. Cập nhật truyện vào database => không cập nhật updatedAt
   * 2. Lấy danh sách chương
   * 3. Lấy danh sách các chương đã có trong database
   * 4. Đẩy các chương vào queue để crawl
   * @param payload
   */
  @OnEvent(NettruyenEvents.STORY)
  async crawlStory({ target, story, source }: CrawlStoryNettruyenDto) {
    // load truyện
    await this.nettruyenService.load(source)
    // tổng hợp data tryện
    const storyData = this.nettruyenService.getStoryData()
    // B1: Cập nhật truyện vào database Todo: update story data

    // B2: Lấy danh sách chương
    const chapters = storyData.chapters

    // danh sách chương đã tồn tại trong database
    // lấy các chương đã tồn tại trong database
    const posts = await this.postsService.find({ source: { $in: chapters } })

    // bảo lưu chương và order
    const _chapters = this.mapChapterIndex(chapters)

    // dánh sách source chưa cào
    const _sources = _chapters.filter(
      ({ chapter }) => !posts.some((post) => post.source === chapter)
    )

    // gi trạng thái waiting
    const waitings = await Promise.all<PostDocument>(
      this.mapInsertPost(_sources, target, story)
    )

    // đẩy các chương vào queue
    waitings.forEach((doc, index) =>
      this.queue.add(
        NettruyenQueue.CHAPTER,
        new CrawChapterNettruyenDto(doc, index),
        {}
      )
    )
  }

  mapInsertPost(_sources: any, target: TargetDocument, story: PostDocument) {
    return _sources.map(({ chapter }) =>
      this.postsService
        .create({
          target,
          postType: this.buildChapterKey(target),
          source: chapter,
          parent: story._id
        })
        .then((e) => e.toObject())
    )
  }

  mapChapterIndex(chapters: string[]) {
    return chapters.map((chapter, index) => ({ chapter, index }))
  }

  buildChapterKey(target: TargetDocument) {
    return target.name + ':' + 'chapter'
  }
}
