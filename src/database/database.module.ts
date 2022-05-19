import { Module } from '@nestjs/common'
import { MongooseModule as Mongo } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    Mongo.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'))
          connection.plugin(require('mongoose-slug-generator'))
          return connection
        }
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
