import { Inject, Logger, UseGuards } from '@nestjs/common'
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'
import { StockService } from 'src/stock/services/stock.service'
import { Inventory, InventoryOrError, Stock, StockEdge, StockSearch } from 'src/stock/stock.facade'
import { StoreService } from 'src/store/services/store.service'
import { Store, StoreEdge, Stores, StoresOrError } from 'src/store/store.facade'
import { SessionGuard } from 'src/supabase/auth/session.guard'
import { Database } from 'src/supabase/proxies/database.proxy'
import { User } from 'src/supabase/proxies/user.proxy'

import { HomeLoader } from '../data-loaders/home.loader'
import { Home, HomeOrError, NewHome } from '../home.facade'

@Resolver(Home)
export class HomeResolver {
  private readonly logger = new Logger(HomeResolver.name)

  @Inject(Database)
  private readonly database!: Database

  @Inject(User)
  private readonly user!: User

  @Inject(HomeLoader)
  private readonly homes!: HomeLoader

  @Inject(StoreService)
  private readonly store!: StoreService

  @Inject(StockService)
  private readonly stock!: StockService

  @ResolveField((_type) => String)
  async name(@Root() root: Home) {
    return this.homes.load(root.id).then((home) => home?.name)
  }

  @ResolveField((_type) => StoresOrError)
  async stores(@Root() root: Home) {
    return this.store
      .getByHomeId(root.id)
      .then((stores) => stores.map((store) => new Store(store)))
      .then((stores) => stores.map((store) => new StoreEdge({ cursor: `${root.id}:${store.id}`, node: store })))
      .then((edges) => new Stores({ edges }))
      .catch((error) => {
        this.logger.error({ error, home: root }, 'failed to resolve home stores')

        return new GqlError(error)
      })
  }

  @ResolveField((_type) => InventoryOrError)
  async inventory(@Root() root: Home, @Args({ type: () => StockSearch }) params: StockSearch) {
    return this.stock
      .search({ ...params, home: root.id })
      .then(({ stock: items }) => items.map((item) => item.id).filter((id): id is string => !!id))
      .then((ids) => ids.map((id) => new Stock({ id })))
      .then((items) => items.map((stock) => new StockEdge({ cursor: `${root.id}:${stock.id}`, node: stock })))
      .then((edges) => new Inventory({ edges }))
      .catch((error) => {
        this.logger.error({ error, home: root.id }, 'failed to resolve home inventory')

        return new GqlError(error)
      })
  }

  @Mutation(() => HomeOrError)
  @UseGuards(SessionGuard)
  async newHome(@Args({ type: () => NewHome }) payload: NewHome) {
    const { error } = await this.database
      .from('homes')
      .insert({ created_by: this.user.id, id: payload.id, name: payload.name })

    if (error) {
      this.logger.error('failed to create new home', { error })
      return new GqlError({ message: error.message })
    }

    return new Home(payload)
  }
}
