import { Inject, Logger } from '@nestjs/common'
import { Args, ID, ResolveField, Resolver } from '@nestjs/graphql'
import { Database } from 'src/supabase/proxies/database.proxy'

import { HomeLoader } from '../data-loaders/home.loader'
import { Home, HomeEdge, HomeNotFoundError, HomeOrError, Homes } from '../home.facade'

@Resolver(Homes)
export class HomesResolver {
  private readonly logger = new Logger(HomesResolver.name)

  @Inject(Database)
  private readonly database!: Database

  @Inject(HomeLoader)
  private readonly homes!: HomeLoader

  @ResolveField((_type) => HomeOrError)
  async byId(@Args('id', { type: () => ID }) id: string) {
    return this.homes.load(id).then((home) => {
      if (!home) {
        return new HomeNotFoundError({ id })
      }

      return new Home(home)
    })
  }

  @ResolveField((_type) => [HomeEdge])
  async edges() {
    return this.database
      .from('homes')
      .select('*')
      .then((result) => {
        const { data, error } = result
        if (error) {
          this.logger.error({ error }, 'homes query failed')

          return []
        }

        data.forEach((home) => this.homes.prime(home.id, home))

        return data
      })
      .then((homes) => homes.map((home) => new Home({ id: home.id })))
      .then((nodes) => nodes.map((home) => new HomeEdge({ cursor: home.id, node: home })))
  }
}
