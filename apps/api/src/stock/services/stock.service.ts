import { Inject, Logger } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { IngredientService } from 'src/ingredient/services/ingredient.service'
import { Database } from 'src/supabase/proxies/database.proxy'
import { User } from 'src/supabase/proxies/user.proxy'
import { v5 } from 'uuid'

import { StockLoader } from '../data-loaders/stock.loader'
import { StockByStoreLoader } from '../data-loaders/stock-by-store.loader'
import type { NewStockByNameOnly, StockSearch } from '../stock.facade'

export class StockService {
  private readonly logger = new Logger(StockService.name)

  @Inject(StockLoader)
  private readonly stock!: StockLoader

  @Inject(StockByStoreLoader)
  private readonly byStore!: StockByStoreLoader

  @Inject(Database)
  private readonly database!: Database

  @Inject(IngredientService)
  private readonly ingredients!: IngredientService

  @Inject(User)
  private readonly user!: User

  async create(payload: NewStockByNameOnly) {
    const { name, id } = payload
    const ingredient = await this.ingredients.findOrCreate({ id: v5('as-ingredient', id), name })

    const { error, data } = await this.database
      .from('stock')
      .insert({
        created_by: this.user.id,
        expires_at: payload.expiry?.toISOString(),
        id: payload.id,
        ingredient_id: ingredient.id,
        quantity: payload.quantity,
        store_id: payload.store,
      })
      .select()

    if (error) {
      this.logger.error('failed to create new stock', { error, ingredient, name, store: payload.store })

      throw error
    }

    const row = data[0]
    this.stock.prime(row.id, row)

    return row
  }

  async search(params: StockSearch) {
    const { expiresIn, home, first = 20 } = params
    let pipeline = this.database.from('normalised_stock').select('*', { count: 'exact' })

    if (expiresIn) {
      const expiry = dayjs().add(expiresIn)

      pipeline = pipeline.lte('expires_at', expiry.toISOString())
    }

    if (home) {
      pipeline = pipeline.eq('home_id', home)
    }

    const { error, data: stock, count } = await pipeline.order('expires_at', { ascending: true }).limit(first)
    if (error) {
      this.logger.error('failed to search for stock', { error, params })

      throw error
    }

    return { count, stock }
  }

  async getById(stock: string) {
    return this.stock.load(stock)
  }

  async getByStoreId(store: string) {
    const stock = await this.byStore.load(store)
    for (const item of stock) {
      this.stock.prime(item.id, item)
    }

    return stock
  }
}
