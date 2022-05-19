import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { LeechService } from './leech.service'
import { CreateRequestDto } from './dto/create-request.dto'

@Controller()
export class LeechController {
  constructor(private readonly requestService: LeechService) {}

  @MessagePattern('createRequest')
  create(@Payload() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto)
  }
}
