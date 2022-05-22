import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { PostsService } from '@schema/posts/posts.service'
import { NettruyenEvents } from '@site/nettruyen/enums/events'
import { NettruyenQueue } from '@site/nettruyen/enums/queue'
import { CrawlStoryNettruyenDto } from '@site/nettruyen/dto/crawl-story.dto'
import { SiteListeners } from '@shared/site/listeners'

@Injectable()
export class NettruyenListeners extends SiteListeners {
  readonly logger = new Logger(NettruyenListeners.name)

  constructor(
    readonly nettruyenService: NettruyenService,
    readonly postsService: PostsService,
    @InjectQueue(NettruyenQueue.NAME) readonly queue: Queue
  ) {
    super(nettruyenService, postsService, queue)
  }

  @OnEvent(NettruyenEvents.STORY)
  async crawlStory({ target, story, source }: CrawlStoryNettruyenDto) {
    return super.crawlStory({ target, story, source })
  }
}
