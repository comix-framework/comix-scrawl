import { Injectable, Logger } from '@nestjs/common'

import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { TargetsService } from '@schema/targets/targets.service'
import { PostsService } from '@schema/posts/posts.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Cron } from '@nestjs/schedule'
import { SiteJobs } from '@shared/site/jobs'

@Injectable()
export class NettruyenJobs extends SiteJobs {
  readonly logger = new Logger(NettruyenJobs.name)

  constructor(
    readonly nettruyenService: NettruyenService,
    readonly targetsService: TargetsService,
    readonly postsService: PostsService,
    readonly eventEmitter: EventEmitter2
  ) {
    super(nettruyenService, targetsService, postsService, eventEmitter)
  }

  @Cron('0 41 * * * *')
  async getStories() {
    return super.getStories()
  }

  async getTarget(name = 'nettruyen') {
    return this.targetsService.findOne({
      name,
      active: true
    })
  }
}
