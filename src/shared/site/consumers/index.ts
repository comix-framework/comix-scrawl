import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process
} from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { Injectable, Logger } from '@nestjs/common'

import { PostsService } from '@schema/posts/posts.service'
import { PostStatus } from '@schema/posts/enums/post-status'
import { SiteService } from '@shared/site/site.service'
import { CrawChapterDto } from '@shared/site/dto/crawl-chapter.dto'
import { SiteQueue } from '@shared/site/enums/queue'

@Injectable()
export class SiteConsumers {
  readonly logger = new Logger(SiteConsumers.name)

  constructor(
    readonly siteService: SiteService,
    readonly postsService: PostsService,
    readonly queue: Queue
  ) {}

  /**
   * Xử lý các chapter cần crawl
   */
  async transcode(job: Job<CrawChapterDto>) {
    await this.siteService.load(job.data.chapter.source)
    return this.siteService.getChapterData()
  }

  /**
   * Xảy ra khi job được kích hoạt
   */
  async onActive(job: Job<CrawChapterDto>) {
    // Todo: phát sinh websocket
    this.logger.debug(`Crawler Chapter Active: ${job.data.chapter.source}`)
    await this.postsService.update(job.data.chapter, {
      postStatus: PostStatus.DOING
    })
  }

  /**
   * Xảy ra khi job được hoàn thành
   */
  async onCompleted(job: Job<CrawChapterDto>) {
    this.logger.debug(`Crawler Chapter Done: ${job.data.chapter.source}`)
    // Todo: phát sinh websocket
    await this.postsService.update(job.data.chapter, {
      postStatus: PostStatus.DONE
    })
  }

  /**
   * Xảy ra khi job bị lỗi
   */
  async onError(job: Job<CrawChapterDto>, error: Error) {
    this.logger.debug(`Crawler Chapter Error: ${job.data.chapter.source}`)
    await this.postsService.update(job.data.chapter, {
      postStatus: PostStatus.FAILED
    })
    console.log(error)
  }
}
