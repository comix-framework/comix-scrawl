import { Module } from '@nestjs/common'
import { NettruyenService } from './nettruyen.service'
import { NettruyenController } from './nettruyen.controller'
import { NettruyenJobs } from '@site/nettruyen/jobs'
import { BullModule } from '@nestjs/bull'
import { NettruyenConsumers } from '@site/nettruyen/consumers'
import { LeechModule } from '@shared/leech/leech.module'
import { NettruyenEvents } from '@site/nettruyen/events'
import { TargetsModule } from '@schema/targets/targets.module'
import { PostsModule } from '@schema/posts/posts.module'
import { NettruyenQueue } from '@site/nettruyen/config/name'

@Module({
  imports: [
    BullModule.registerQueue({
      name: NettruyenQueue.NAME
    }),
    LeechModule,
    TargetsModule,
    PostsModule
  ],
  controllers: [NettruyenController],
  providers: [
    NettruyenService,
    NettruyenJobs,
    NettruyenConsumers,
    NettruyenEvents
  ]
})
export class NettruyenModule {}
