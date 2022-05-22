import { Injectable, Logger } from '@nestjs/common'
import * as sharp from 'sharp'
import { IOptimizerInput, ISize } from './types'
import { OverlayOptions } from 'sharp'

@Injectable()
export class OptimizerService {
  private readonly logger = new Logger(OptimizerService.name)

  async resize(
    image: IOptimizerInput,
    { width, height }: ISize
  ): Promise<Buffer> {
    return sharp(image)
      .jpeg({})
      .resize(width, height, { fit: 'cover' })
      .toBuffer()
  }

  async getImageMeta(image: IOptimizerInput) {
    const _image = sharp(image)
    return _image.metadata()
  }

  async resizeWithWater(
    image: IOptimizerInput,
    width,
    height,
    composites: OverlayOptions[]
  ) {
    return sharp(image)
      .jpeg({})
      .resize(width, height, { fit: 'cover' })
      .composite(composites)
      .toBuffer()
  }
}
