import { Inject } from '@nestjs/common'
import { Database } from 'src/supabase/proxies/database.proxy'
import { User } from 'src/supabase/proxies/user.proxy'

import { IngredientLoader } from '../data-loaders/ingredient.loader'
import type { NewIngredient } from '../ingredient.facade'

export class IngredientService {
  @Inject(IngredientLoader)
  private readonly ingredients!: IngredientLoader

  @Inject(Database)
  private readonly database!: Database

  @Inject(User)
  private readonly user!: User

  async getById(ingredient: string) {
    return this.ingredients.load(ingredient)
  }

  async create(payload: NewIngredient) {
    const { error, data } = await this.database
      .from('ingredients')
      .insert({ created_by: this.user.id, id: payload.id, name: payload.name })
      .select()

    if (error) {
      throw error
    }

    return data[0]
  }

  async findOrCreate(payload: NewIngredient) {
    const { data, error } = await this.database.rpc('find_ingredient', { input: payload.name })
    if (error) {
      throw error
    }

    const ingredient = data.at(0)
    if (ingredient) {
      return ingredient
    }

    return this.create(payload)
  }
}
