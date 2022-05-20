import { Module } from '@nestjs/common'
import { TargetsService } from './targets.service'
import { TargetsController } from './targets.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Target, TargetEntity } from '@schema/targets/entities/target.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Target.name,
        schema: TargetEntity
      }
    ])
  ],
  controllers: [TargetsController],
  providers: [TargetsService],
  exports: [TargetsService]
})
export class TargetsModule {}
