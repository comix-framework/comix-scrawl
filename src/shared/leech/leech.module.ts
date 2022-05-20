import { Module } from '@nestjs/common'
import { LeechService } from './leech.service'
import { LeechController } from './leech.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [LeechController],
  providers: [LeechService],
  exports: [LeechService]
})
export class LeechModule {}
