import { Injectable, Logger } from '@nestjs/common'
import { ICloudService } from '@shared/cloud/types/cloud'
import { AxiosRequestHeaders } from 'axios'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map } from 'rxjs'
import * as https from 'https'

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
}
