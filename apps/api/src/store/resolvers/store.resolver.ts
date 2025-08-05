import { Inject, Logger, UseGuards } from '@nestjs/common'
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'
import { StockService } from 'src/stock/services/stock.service'
import { Inventory, InventoryOrError, Stock, StockEdge } from 'src/stock/stock.facade'
import { SessionGuard } from 'src/supabase/auth/session.guard'
import { Database } from 'src/supabase/proxies/database.proxy'
import { User } from 'src/supabase/proxies/user.proxy'

import { StoreService } from '../services/store.service'
import { NewStore, Store, StoreOrError } from '../store.facade'

@Resolver(Store)
export class StoreResolver {
  private readonly logger = new Logger(StoreResolver.name)

  @Inject(Database)
  private readonly database!: Database

  @Inject(User)
  private readonly user!: User

  @Inject(StoreService)
  private readonly stores!: StoreService

  @Inject(StockService)
  private readonly stocks!: StockService

  @ResolveField((_type) => String)
  async name(@Root() root: Store) {
    return this.stores.getById(root.id).then((store) => store?.name)
  }

  @ResolveField((_type) => InventoryOrError)
  async stock(@Root() root: Store) {
    return this.stocks
      .getByStoreId(root.id)
      .then((items) => items.map((stock) => new Stock(stock)))
      .then((items) => items.map((stock) => new StockEdge({ cursor: `${root.id}:${stock.id}`, node: stock })))
      .then((edges) => new Inventory({ edges }))
      .catch((error) => {
        this.logger.error({ error, store: root }, 'failed to resolve store investory')

        return new GqlError(error)
      })
  }

  @Mutation(() => StoreOrError)
  @UseGuards(SessionGuard)
  async newStore(@Args({ type: () => NewStore }) payload: NewStore) {
    const { error } = await this.database
      .from('stores')
      .insert({ created_by: this.user.id, home_id: payload.home, id: payload.id, name: payload.name })

    if (error) {
      this.logger.error('failed to create new store', { error })
      return new GqlError({ message: error.message })
    }

    return new Store(payload)
  }
}
