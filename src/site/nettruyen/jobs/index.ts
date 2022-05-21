import { Injectable, Logger } from '@nestjs/common'

import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Cron } from '@nestjs/schedule'
import { NettruyenEvents } from '@site/nettruyen/enums/events'
import { TargetDocument } from '@schema/targets/entities/target.entity'
import { CrawlStoryNettruyenDto } from '@site/nettruyen/dto/crawl-story.dto'
import { PostDocument } from '@schema/posts/entities/post.entity'

@Injectable()
export class NettruyenJobs {
  private readonly logger = new Logger(NettruyenJobs.name)

  constructor(
    private readonly nettruyenService: NettruyenService,
    private readonly targetsService: TargetsService,
    private readonly postsService: PostsService,
    private eventEmitter: EventEmitter2
  ) {}

  @Cron('30 * * * * *')
  async getStories() {
    this.logger.debug('Get stories...')

    try {
      // Kiểm xem trang mục tiêu. Target chính có tồn tại hoặc active hay không
      const target = await this.targetsService.findOne({
        name: 'nettruyen',
        active: true
      })

      if (!target) {
        return
      }

      this.logger.debug(`Target ${target.name} is active`)

      // request lấy data
      await this.nettruyenService.load(target.source)

      // lấy sach sách truyện
      const stories = this.nettruyenService.getStories()

      for (const source of stories) {
        // chỉ crawl các truyện có trong database cho phép cào
        const story = await this.getParent(target, source)

        if (this.verifyStory(story)) {
          // phát sinh sự kiệm cào
          this.eventEmitter.emit(
            NettruyenEvents.STORY,
            new CrawlStoryNettruyenDto(source, story, target)
          )
        }
      }
    } catch (e) {
      this.logger.error('Error when crawl stories', e.message)
    }
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
