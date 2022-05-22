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
import { PostsService } from '@schema/posts/posts.service'
import { CrawChapterNettruyenDto } from '@site/nettruyen/dto/crawl-chapter.dto'
import { SiteConsumers } from '@shared/site/consumers'

@Processor(NettruyenQueue.NAME)
export class NettruyenConsumers extends SiteConsumers {
  readonly logger = new Logger(NettruyenConsumers.name)

  constructor(
    readonly nettruyenService: NettruyenService,
    readonly postsService: PostsService,
    @InjectQueue(NettruyenQueue.NAME) readonly queue: Queue
  ) {
    super(nettruyenService, postsService, queue)
  }

  /**
   * Xử lý các chapter cần crawl
   */
  @Process(NettruyenQueue.CHAPTER)
  async transcode(job: Job<CrawChapterNettruyenDto>) {
    return super.transcode(job)
  }

  /**
   * Xảy ra khi job được kích hoạt
   */
  @OnQueueActive({ name: NettruyenQueue.CHAPTER })
  async onActive(job: Job<CrawChapterNettruyenDto>) {
    // Todo: phát sinh websocket
    return super.onActive(job)
  }

  /**
   * Xảy ra khi job được hoàn thành
   */
  @OnQueueCompleted({ name: NettruyenQueue.CHAPTER })
  async onCompleted(job: Job<CrawChapterNettruyenDto>) {
    return super.onCompleted(job)
  }

  /**
   * Xảy ra khi job bị lỗi
   */
  @OnQueueFailed({ name: NettruyenQueue.CHAPTER })
  async onError(job: Job<CrawChapterNettruyenDto>, error: Error) {
    return super.onError(job, error)
  }
}
