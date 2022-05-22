import { Injectable, Logger } from '@nestjs/common'
import { Queue } from 'bull'

import { PostsService } from '@schema/posts/posts.service'
import { TargetDocument } from '@schema/targets/entities/target.entity'
import { PostDocument } from '@schema/posts/entities/post.entity'
import { SiteService } from '@shared/site/site.service'
import { CrawChapterDto } from '@shared/site/dto/crawl-chapter.dto'
import { CrawlStoryDto } from '@shared/site/dto/crawl-story.dto'
import { NettruyenQueue } from '@site/nettruyen/enums/queue'

@Injectable()
export class SiteListeners {
  readonly logger = new Logger(SiteListeners.name)

  constructor(
    readonly siteService: SiteService,
    readonly postsService: PostsService,
    readonly queue: Queue
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
  async crawlStory({ target, story, source }: CrawlStoryDto) {
    // load truyện
    await this.siteService.load(source)
    // tổng hợp data tryện
    const storyData = this.siteService.getStoryData()
    this.logger.debug('Update story: ' + storyData.name)
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
      this.queue.add(NettruyenQueue.CHAPTER, new CrawChapterDto(doc, index), {})
    )
  }

  mapInsertPost(_sources: any, target: TargetDocument, story: PostDocument) {
    return _sources.map(({ chapter }) =>
      this.postsService
        .create({
          target: target._id,
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
