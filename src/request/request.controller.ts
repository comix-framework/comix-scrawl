import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { RequestService } from './request.service'
import { CreateRequestDto } from './dto/create-request.dto'

@Controller()
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @MessagePattern('createRequest')
  create(@Payload() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto)
  }
}
