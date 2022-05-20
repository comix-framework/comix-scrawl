import { Module } from '@nestjs/common'
import { NettruyenService } from './nettruyen.service'
import { NettruyenController } from './nettruyen.controller'
import { NettruyenJobs } from '@site/nettruyen/jobs'
import { BullModule } from '@nestjs/bull'
import { NettruyenConsumers } from '@site/nettruyen/consumers'
import { LeechModule } from '@shared/leech/leech.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'nettruyen'
    }),
    LeechModule
  ],
  controllers: [NettruyenController],
  providers: [NettruyenService, NettruyenJobs, NettruyenConsumers]
})
export class NettruyenModule {}
