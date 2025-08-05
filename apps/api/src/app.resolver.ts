import { Query, ResolveField, Resolver } from '@nestjs/graphql'

import { App } from './app.facade'
import * as fs from 'node:fs'

const VERSION = JSON.parse(fs.readFileSync('package.json').toString()).version

@Resolver(App)
export class AppResolver {
  @Query(() => App)
  app() {
    return new App()
  }

  @ResolveField((_type) => String)
  async version() {
    return VERSION
  }
}
