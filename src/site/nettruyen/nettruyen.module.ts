import { Module } from '@nestjs/common'
import { NettruyenService } from './nettruyen.service'
import { NettruyenController } from './nettruyen.controller'
import { BullModule } from '@nestjs/bull'
import { NettruyenConsumers } from '@site/nettruyen/consumers'
import { LeechModule } from '@shared/leech/leech.module'
import { NettruyenListeners } from '@site/nettruyen/listeners'
import { TargetsModule } from '@schema/targets/targets.module'
import { PostsModule } from '@schema/posts/posts.module'
import { NettruyenQueue } from '@site/nettruyen/enums/queue'
import { NettruyenJobs } from '@site/nettruyen/jobs'
import { CloudModule } from '@shared/cloud/cloud.module'
import { OptimizerModule } from '@shared/optimizer/optimizer.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: NettruyenQueue.NAME
    }),
    LeechModule,
    TargetsModule,
    PostsModule,
    CloudModule,
    OptimizerModule
  ],
  controllers: [NettruyenController],
  providers: [
    NettruyenService,
    NettruyenConsumers,
    NettruyenListeners,
    NettruyenJobs
  ]
})
export class NettruyenModule {}
