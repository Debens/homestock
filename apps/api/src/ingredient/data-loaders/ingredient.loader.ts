import { Inject } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { InjectableProxy } from 'nestjs-cls'
import type { Database as DatabaseSchema } from 'src/supabase/generated/supabase.types'
import { Database } from 'src/supabase/proxies/database.proxy'

type Ingredient = DatabaseSchema['public']['Tables']['ingredients']['Row']

@InjectableProxy()
export class IngredientLoader extends DataLoader<string, Ingredient | undefined> {
  @Inject(Database)
  private readonly database!: Database

  constructor() {
    super(async (keys) => {
      const { data, error } = await this.database.from('ingredients').select('*').in('id', keys)

      if (error) {
        throw new Error(`ingredient query failed: ${error.message}`)
      }

      const mapping = new Map(data.map((row) => [row.id, row]))
      return keys.map((id) => mapping.get(id))
    })
  }
}
