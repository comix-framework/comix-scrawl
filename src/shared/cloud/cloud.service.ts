import { Injectable, Logger } from '@nestjs/common'
import { AxiosRequestHeaders } from 'axios'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map } from 'rxjs'
import * as https from 'https'
import { Metadata } from 'sharp'
import { v4 as uuidv4 } from 'uuid'

import { ICloudService } from '@shared/cloud/types/cloud'

@Injectable()
export class CloudService implements ICloudService {
  private readonly logger = new Logger(CloudService.name)

  constructor(private httpService: HttpService) {}

  async downloadImage(
    url: string,
    headers: AxiosRequestHeaders = {}
  ): Promise<Error | Buffer> {
    const res = this.httpService
      .get(url, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        headers,
        responseType: 'arraybuffer'
      })
      .pipe(
        map((data) => data.data),
        catchError((err) => {
          this.logger.error(err)
          throw 'Error: ' + err
        })
      )

    return firstValueFrom<Buffer>(res)
  }

  buildImagepath(meta: Metadata) {
    return `storage/chapters/${meta.width}x${meta.height}-${uuidv4()}.${
      meta.format
    }`
  }

  async buildImageMeta(meta: Metadata) {
    return {
      src: this.buildImagepath(meta),
      width: meta.width,
      height: meta.height,
      storage: 'leech'
    }
  }
}
