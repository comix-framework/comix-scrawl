import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from '@database/database.module'
import { ConfigModule } from '@nestjs/config'
import { LeechModule } from '@shared/leech/leech.module'

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, LeechModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
