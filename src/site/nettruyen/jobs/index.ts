import { Injectable, Logger } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { Cron, CronExpression } from '@nestjs/schedule'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { NettruyenModule } from '@site/nettruyen/nettruyen.module'
import { NettruyenService } from '@site/nettruyen/nettruyen.service'

@Injectable()
export class NettruyenJobs {
  private readonly logger = new Logger(NettruyenJobs.name)

  constructor(
    private readonly nettruyenService: NettruyenService,
    private readonly targetsService: TargetsService,
    private readonly postsService: PostsService,
    private eventEmitter: EventEmitter2,
    @InjectQueue('nettruyen') private queue: Queue
  ) {}

  /**
   * Kiểm tra có nằm trong target hay không => clear off. Loop sau đó kiểm tra trong colection post có hay chưa. Chạy 15 phút 1 lần
   */
  @Cron(CronExpression.EVERY_30_SECONDS)
  async getStories() {
    this.logger.debug(NettruyenModule.name)
    try {
      const target = await this.targetsService.findOne({ name: 'nettruyen' })
      // request tới lấy danh sách truyện

      if (!target) {
        return
      }
      await this.nettruyenService.load(target.source)

      const stories = this.nettruyenService.getStories()

      for (const source of stories) {
        const post = await this.postsService.findOne({
          target: target._id,
          source
        })

        // nếu có tồn tại trong database thì bỏ qua
        if (post) {
          continue
        }

        this.eventEmitter.emit('nettruyen.story', source)
      }
    } catch (e) {
      this.logger.error('Error when crawl stories', e.message)
    }
  }
}
