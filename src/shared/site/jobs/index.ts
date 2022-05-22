import { Injectable, Logger } from '@nestjs/common'

import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { NettruyenEvents } from '@site/nettruyen/enums/events'
import { TargetDocument } from '@schema/targets/entities/target.entity'
import { PostDocument } from '@schema/posts/entities/post.entity'
import { SiteService } from '@shared/site/site.service'
import { CrawlStoryDto } from '@shared/site/dto/crawl-story.dto'

@Injectable()
export class SiteJobs {
  readonly logger = new Logger(SiteJobs.name)

  constructor(
    readonly siteService: SiteService,
    readonly targetsService: TargetsService,
    readonly postsService: PostsService,
    readonly eventEmitter: EventEmitter2
  ) {}

  async getStories() {
    this.logger.debug('Get stories...')

    try {
      // Kiểm xem trang mục tiêu. Target chính có tồn tại hoặc active hay không
      const target = await this.getTarget()

      if (!target) {
        return
      }
      this.logger.debug(`Target ${target.name} is active`)

      // request lấy data
      await this.siteService.load(target.source)

      // lấy sach sách truyện
      const stories = this.siteService.getStories()

      for (const source of stories) {
        // chỉ crawl các truyện có trong database cho phép cào
        const story = await this.getParent(target, source)

        if (this.verifyStory(story)) {
          // phát sinh sự kiệm cào
          this.fireStoryEvent(source, story, target)
        }
      }
    } catch (e) {
      this.logger.error('Error when crawl stories', e.message)
    }
  }

  fireStoryEvent(source: string, story: PostDocument, target: TargetDocument) {
    this.eventEmitter.emit(
      NettruyenEvents.STORY,
      new CrawlStoryDto(source, story, target)
    )
  }

  async getTarget(name = '') {
    return this.targetsService.findOne({
      name,
      active: true
    })
  }

  /** Kiểm tra truyện
   * 1. Kiểm tra xem truyện có trong database chưa
   * 2. truyện có target mục tiêu, và url truyện không trùng
   */
  verifyStory(story?: PostDocument): boolean {
    return !!story
  }

  async getParent(target: TargetDocument, source: string) {
    return this.postsService.findOne({
      target: target._id,
      source,
      postType: this.buildStoryKey(target)
    })
  }

  buildStoryKey(target: TargetDocument) {
    return target.name + ':' + 'story'
  }
}
