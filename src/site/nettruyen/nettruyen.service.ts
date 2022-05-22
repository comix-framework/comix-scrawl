import { Injectable, Logger } from '@nestjs/common'
import * as fs from 'fs'

import { SiteService } from '@shared/site/site.service'
import { LeechService } from '@shared/leech/leech.service'
import {
  NETTRUYEN_CHAPTER,
  NETTRUYEN_STORIES,
  NETTRUYEN_STORY
} from '@site/nettruyen/config/selector'
import { CloudService } from '@shared/cloud/cloud.service'
import { OptimizerService } from '@shared/optimizer/optimizer.service'

@Injectable()
export class NettruyenService extends SiteService {
  private readonly logger = new Logger(NettruyenService.name)

  constructor(
    readonly leechService: LeechService,
    private readonly cloudService: CloudService,
    private readonly optimizerService: OptimizerService
  ) {
    super(leechService, NETTRUYEN_STORIES, NETTRUYEN_STORY, NETTRUYEN_CHAPTER)
  }

  async chapterImages() {
    const images = await super.chapterImages()

    const _images = []

    // tạo thư mục gi hình ảnh
    fs.mkdirSync(`storage/chapters/`, { recursive: true })

    for (const image of images) {
      const meta = await this.optimizeImage(image.replace(/^\/\//, 'http://'))

      const imageData = await this.cloudService.buildImageMeta(meta)

      fs.writeFileSync(imageData.src, meta.image)

      _images.push(imageData)
    }

    return _images
  }

  async optimizeImage(image: string) {
    const file = await this.cloudService.downloadImage(image, {
      referer: 'http://www.nettruyenco.com/'
    })

    const optimized = await this.optimizerService.resize(file as Buffer, {
      width: 800
    })

    const size = await this.optimizerService.getImageMeta(optimized)

    return {
      image: optimized,
      ...size
    }
  }
}
