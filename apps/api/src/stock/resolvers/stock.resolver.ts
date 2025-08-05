import { Inject, Logger, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql'
import { GraphQLDateTime } from 'graphql-scalars'
import { GqlError } from 'src/errors/errors.facade'
import { Ingredient } from 'src/ingredient/ingredient.facade'
import { IngredientService } from 'src/ingredient/services/ingredient.service'
import { Profile } from 'src/profile/profile.facade'
import { SessionGuard } from 'src/supabase/auth/session.guard'
import { Database } from 'src/supabase/proxies/database.proxy'
import { User } from 'src/supabase/proxies/user.proxy'

import { StockService } from '../services/stock.service'
import { NewStock, NewStockByNameOnly, Stock, StockOrError } from '../stock.facade'

@Resolver(Stock)
export class StockResolver {
  private readonly logger = new Logger(StockResolver.name)

  @Inject(Database)
  private readonly database!: Database

  @Inject(User)
  private readonly user!: User

  @Inject(StockService)
  private readonly stocks!: StockService

  @Inject(IngredientService)
  private readonly ingredients!: IngredientService

  @ResolveField((_type) => Ingredient)
  async ingredient(@Root() root: Stock) {
    const stock = await this.stocks.getById(root.id)
    if (stock) {
      const ingredient = await this.ingredients.getById(stock.ingredient_id)
      if (ingredient) {
        return new Ingredient(ingredient)
      }
    }
  }

  @ResolveField((_type) => Int)
  async quantity(@Root() root: Stock) {
    return this.stocks.getById(root.id).then((stock) => stock?.quantity)
  }

  @ResolveField((_type) => GraphQLDateTime, { nullable: true })
  async expiresOn(@Root() root: Stock) {
    return this.stocks.getById(root.id).then((stock) => stock?.expires_at)
  }

  @ResolveField((_type) => GraphQLDateTime)
  async createdOn(@Root() root: Stock) {
    return this.stocks.getById(root.id).then((stock) => stock?.created_at)
  }

  @ResolveField((_type) => Profile)
  async createdBy(@Root() root: Stock) {
    return this.stocks
      .getById(root.id)
      .then((stock) => stock?.created_by)
      .then((id) => {
        if (id) {
          return new Profile({ id })
        }
      })
  }

  @Mutation(() => StockOrError)
  @UseGuards(SessionGuard)
  async newStock(@Args({ type: () => NewStock }) payload: NewStock) {
    const { error } = await this.database
      .from('stock')
      .insert({ created_by: this.user.id, id: payload.id, ingredient_id: payload.ingredient, store_id: payload.store })

    if (error) {
      this.logger.error('failed to create new stock', { error })
      return new GqlError({ message: error.message })
    }

    return new Stock(payload)
  }

  @Mutation(() => StockOrError)
  @UseGuards(SessionGuard)
  async newStockByNameOnly(@Args({ type: () => NewStockByNameOnly }) payload: NewStockByNameOnly) {
    return this.stocks
      .create(payload)
      .then((stock) => new Stock(stock))
      .catch((error) => new GqlError(error))
  }
}
