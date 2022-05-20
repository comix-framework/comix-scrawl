import { Module } from '@nestjs/common'
import { CloudService } from './cloud.service'
import { CloudController } from './cloud.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [CloudController],
  providers: [CloudService],
  exports: [CloudService]
})
export class CloudModule {}
