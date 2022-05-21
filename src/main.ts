import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule)

  const configService = appContext.get(ConfigService)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: configService.get('PORT')
      },
      logger: new Logger()
    }
  )

  await app.listen()
  await appContext.close()
}
bootstrap()
