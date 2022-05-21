import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor
} from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { Logger } from '@nestjs/common'

import { NettruyenQueue } from '@site/nettruyen/enums/queue'
import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CrawChapterNettruyenDto } from '@site/nettruyen/dto/crawl-chapter.dto'
import { PostStatus } from '@schema/posts/enums/post-status'

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

  /**
   * Xử lý các chapter cần crawl
   */
  @Process(NettruyenQueue.CHAPTER)
  async transcode(job: Job<CrawChapterNettruyenDto>) {
    await this.nettruyenService.load(job.data.chapter.source)
    return this.nettruyenService.getChapterData()
  }

  /**
   * Xảy ra khi job được kích hoạt
   */
  @OnQueueActive({ name: NettruyenQueue.CHAPTER })
  async onActive(job: Job<CrawChapterNettruyenDto>) {
    // Todo: phát sinh websocket
    this.logger.debug(`Crawler Chapter Active: ${job.data.chapter.source}`)
    await this.postsService.update(job.data.chapter, {
      postStatus: PostStatus.DOING
    })
  }

  /**
   * Xảy ra khi job được hoàn thành
   */
  @OnQueueCompleted({ name: NettruyenQueue.CHAPTER })
  async onCompleted(job: Job<CrawChapterNettruyenDto>) {
    this.logger.debug(`Crawler Chapter Done: ${job.data.chapter.source}`)
    // Todo: phát sinh websocket
    await this.postsService.update(job.data.chapter, {
      postStatus: PostStatus.DONE
    })
  }

  /**
   * Xảy ra khi job bị lỗi
   */
  @OnQueueFailed({ name: NettruyenQueue.CHAPTER })
  async onError(job: Job<CrawChapterNettruyenDto>) {
    this.logger.debug(`Crawler Chapter Error: ${job.data.chapter.source}`)
    await this.postsService.update(job.data.chapter, {
      postStatus: PostStatus.TRY
    })
  }
}
