import { Injectable, Logger } from '@nestjs/common'
import { CreateRequestDto } from './dto/create-request.dto'
import { HttpService } from '@nestjs/axios'
import { AxiosRequestHeaders } from 'axios'

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name)

  constructor(private httpService: HttpService) {}

  get(url: string, headers: AxiosRequestHeaders = {}) {
    return this.httpService.get(url, {
      headers
    })
  }

  create(createRequestDto: CreateRequestDto) {
    return 'This action adds a new request'
  }
}
