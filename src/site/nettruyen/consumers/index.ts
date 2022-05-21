import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { Logger } from '@nestjs/common'

import { NettruyenQueue } from '@site/nettruyen/enums/queue'
import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Cron } from '@nestjs/schedule'
import { NettruyenEvents } from '@site/nettruyen/enums/events'
import { TargetDocument } from '@schema/targets/entities/target.entity'

@Processor(NettruyenQueue.NAME)
export class NettruyenConsumers {
  private readonly logger = new Logger(NettruyenConsumers.name)

  constructor(
    private readonly nettruyenService: NettruyenService,
    private readonly targetsService: TargetsService,
    private readonly postsService: PostsService,
    private eventEmitter: EventEmitter2,
    @InjectQueue(NettruyenQueue.NAME) private readonly queue: Queue
  ) {}

  @OnQueueActive({ name: NettruyenQueue.STORIES })
  onActive(job: Job) {
    // phát sinh websocket
    // this.logger.debug(`Prossing with ${job.id} with data ${job.data}...`)
  }

  @Cron('45 * * * * *')
  async getStories() {
    await this.queue.empty()
    this.logger.debug('Get stories...')
    try {
      const target = await this.targetsService.findOne({ name: 'nettruyen' })
      // request tới lấy danh sách truyện

      if (!target) {
        return
      }
      await this.nettruyenService.load(target.source)

      // lấy sach sách truyện
      const stories = this.nettruyenService.getStories()

      for (const source of stories) {
        if (await this.verifyPost(source, target)) {
          continue
        }
        // phát sinh sự kiện cào truyện
        this.eventEmitter.emit(NettruyenEvents.STORY, source)
      }
    } catch (e) {
      this.logger.error('Error when crawl stories', e.message)
    }
  }

  /** Kiểm tra truyện
   * 1. Kiểm tra xem truyện có trong database chưa
   * 2. truyện có target mục tiêu, và url truyện không trùng
   */
  async verifyPost(source: string, target: TargetDocument): Promise<boolean> {
    const post = await this.postsService.findOne({
      target: target._id,
      source
    })

    return !!post
  }
}
