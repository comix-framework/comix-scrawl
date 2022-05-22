import { Module } from '@nestjs/common'
import { MongooseModule as Mongo } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongoConnect } from '@database/enums/name'

@Module({
  imports: [
    Mongo.forRootAsync({
      imports: [ConfigModule],
      connectionName: MongoConnect.CRAWL,
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI_CRAWLER')
      }),
      inject: [ConfigService]
    }),
    Mongo.forRootAsync({
      imports: [ConfigModule],
      connectionName: MongoConnect.COMIX,
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI_COMIX')
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
