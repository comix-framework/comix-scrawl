import { AxiosRequestHeaders } from 'axios'

interface ICloudMethods {
  downloadImage: (
    url: string,
    headers: AxiosRequestHeaders
  ) => Promise<Error | Buffer>
}

export type ICloudService = ICloudMethods
