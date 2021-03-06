import { Module } from '@nestjs/common'
import { OptimizerService } from './optimizer.service'
import { OptimizerController } from './optimizer.controller'

@Module({
  controllers: [OptimizerController],
  providers: [OptimizerService],
  exports: [OptimizerService]
})
export class OptimizerModule {}
