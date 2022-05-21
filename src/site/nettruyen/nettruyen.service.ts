import { Injectable } from '@nestjs/common'
import { SiteService } from '@shared/site/site.service'
import { LeechService } from '@shared/leech/leech.service'
import {
  NETTRUYEN_CHAPTER,
  NETTRUYEN_STORIES,
  NETTRUYEN_STORY
} from '@site/nettruyen/config/selector'

@Injectable()
export class NettruyenService extends SiteService {
  constructor(readonly leechService: LeechService) {
    super(leechService, NETTRUYEN_STORIES, NETTRUYEN_STORY, NETTRUYEN_CHAPTER)
  }

  chapterImages(): string[] {
    const images = super.chapterImages()

    return images.map((image) => 'http:' + image)
  }
}
