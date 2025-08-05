import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClsModule } from 'nestjs-cls'

import appConfig from './app.config'
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import { GraphQLModule } from './graphql/graphql.module'
import { ViewerModule } from './viewer/viewer.module'

@Module({
  controllers: [AppController],
  imports: [
    ViewerModule,
    GraphQLModule,
    ClsModule.forRoot({ middleware: { saveRes: true } }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
