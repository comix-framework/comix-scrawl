import { Module } from '@nestjs/common'
import { RequestService } from './request.service'
import { RequestController } from './request.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
