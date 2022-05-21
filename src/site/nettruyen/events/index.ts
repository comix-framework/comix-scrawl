import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class NettruyenEvents {
  private readonly logger = new Logger(NettruyenEvents.name)

  constructor(
    private readonly nettruyenService: NettruyenService,
    private readonly targetsService: TargetsService,
    private readonly postsService: PostsService,
    private eventEmitter: EventEmitter2,
    @InjectQueue('nettruyen') private queue: Queue
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
  @OnEvent('nettruyen.story')
  async crawlStory(payload: string) {
    await this.nettruyenService.load(payload)
    const storyData = this.nettruyenService.getStoryData()
    // B1: Cập nhật truyện vào database Todo: update story data

    // B2: Lấy danh sách chương
    const chapters = storyData.chapters

    // danh sách chương đã tồn tại trong database
    const posts = await this.postsService.find({ source: { $in: chapters } })

    // dánh sách source chưa cào
    const sources = chapters.filter(
      (chapter) => !posts.some((post) => post.source === chapter)
    )

    // this.logger.log('sources', sources)
  }
}
