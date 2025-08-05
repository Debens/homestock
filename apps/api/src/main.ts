import 'reflect-metadata'

import { ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService, type ConfigType } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dayjs from 'dayjs'
import * as duration from 'dayjs/plugin/duration'
import { ClsMiddleware } from 'nestjs-cls'

import type appConfig from './app.config'
import { AppModule } from './app.module'

dayjs.extend(duration)

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    bufferLogs: true,
    cors: true,
  })

  await ConfigModule.envVariablesLoaded

  app.useGlobalPipes(new ValidationPipe())

  /* https://papooch.github.io/nestjs-cls/considerations/security */
  app.use(new ClsMiddleware({ saveRes: true, useEnterWith: false }).use)

  if (process.env.ENABLED_SWAGGER === 'true') {
    const builder = new DocumentBuilder().setTitle('@homestock/api').setVersion('2.0').build()
    const document = SwaggerModule.createDocument(app, builder)
    SwaggerModule.setup('swagger', app, document)
  }

  const config = app.get(ConfigService).getOrThrow<ConfigType<typeof appConfig>>('app')

  await app.listen(config.port, () => {
    console.debug(`🚀 Server ready at port: ${config.port}`, 'customer-api')
  })
}

void bootstrap()
