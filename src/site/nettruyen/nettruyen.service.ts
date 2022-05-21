import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { SiteService } from '@shared/site/site.service'
import { LeechService } from '@shared/leech/leech.service'
import {
  NETTRUYEN_CHAPTER,
  NETTRUYEN_STORIES,
  NETTRUYEN_STORY
} from '@site/nettruyen/config/selector'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { NettruyenQueue } from '@site/nettruyen/config/name'

@Injectable()
export class NettruyenService
  extends SiteService
  implements OnApplicationBootstrap
{
  constructor(
    readonly leechService: LeechService,
    @InjectQueue(NettruyenQueue.NAME) private readonly audioQueue: Queue
  ) {
    super(leechService, NETTRUYEN_STORIES, NETTRUYEN_STORY, NETTRUYEN_CHAPTER)
  }

  chapterImages(): string[] {
    const images = super.chapterImages()

    return images.map((image) => 'http:' + image)
  }

  async onApplicationBootstrap() {
    await this.audioQueue.add(
      NettruyenQueue.STORIES,
      {},
      {
        repeat: {
          cron: '* * * * * *'
        }
      }
    )
  }
}
