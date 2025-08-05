import { Inject, Logger, UseGuards } from '@nestjs/common'
import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { DateTimeResolver } from 'graphql-scalars'
import { GqlError } from 'src/errors/errors.facade'
import { Profile } from 'src/profile/profile.facade'
import { ProfileService } from 'src/profile/services/profile.service'
import { StockService } from 'src/stock/services/stock.service'
import { Inventory, InventoryOrError, Stock, StockEdge, StockSearch } from 'src/stock/stock.facade'
import { SessionGuard } from 'src/supabase/auth/session.guard'
import { User } from 'src/supabase/proxies/user.proxy'

import { Viewer } from './viewer.facade'

@Resolver(Viewer)
export class ViewerResolver {
  private readonly logger = new Logger(ViewerResolver.name)

  @Inject(User)
  private readonly user!: User

  @Inject(ProfileService)
  private readonly profiles!: ProfileService

  @Inject(StockService)
  private readonly stock!: StockService

  @Query(() => Viewer)
  @UseGuards(SessionGuard)
  viewer() {
    return new Viewer({ id: this.user.id })
  }

  @ResolveField((_type) => DateTimeResolver)
  async createdOn() {
    return this.user.created
  }

  @ResolveField((_type) => String)
  async email() {
    return this.user.email
  }

  @ResolveField((_type) => InventoryOrError)
  async inventory(@Args({ type: () => StockSearch }) params: StockSearch) {
    return this.stock
      .search(params)
      .then(({ stock: items }) => items.map((item) => item.id).filter((id): id is string => !!id))
      .then((ids) => ids.map((id) => new Stock({ id })))
      .then((items) => items.map((stock) => new StockEdge({ cursor: `${this.user.id}:${stock.id}`, node: stock })))
      .then((edges) => new Inventory({ edges }))
      .catch((error) => {
        this.logger.error({ error }, 'failed to resolve viewer inventory')

        return new GqlError(error)
      })
  }

  @ResolveField((_type) => Profile, { nullable: true })
  async profile() {
    return this.profiles.getById(this.user.id).then((profile) => {
      if (profile) {
        return new Profile(profile)
      }
    })
  }
}
