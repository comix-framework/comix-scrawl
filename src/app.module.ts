import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from '@database/database.module'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { ScheduleModule } from '@nestjs/schedule'
import { NettruyenModule } from '@site/nettruyen/nettruyen.module'
import { PostsModule } from '@schema/posts/posts.module'
import { TargetsModule } from '@schema/targets/targets.module'

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseModule,
    NettruyenModule,
    PostsModule,
    NettruyenModule,
    TargetsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
