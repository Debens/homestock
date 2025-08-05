import { Inject } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { InjectableProxy } from 'nestjs-cls'
import type { Database as DatabaseSchema } from 'src/supabase/generated/supabase.types'
import { Database } from 'src/supabase/proxies/database.proxy'

type Stock = DatabaseSchema['public']['Tables']['stock']['Row']

@InjectableProxy()
export class StockByStoreLoader extends DataLoader<string, Stock[]> {
  @Inject(Database)
  private readonly database!: Database

  constructor() {
    super(async (keys) => {
      const { data, error } = await this.database
        .from('stores')
        .select(`
          id,
          stock (
            *
          )
        `)
        .in('id', keys)

      if (error) {
        throw new Error(`stock query failed: ${error.message}`)
      }

      const mapping = new Map(data.map((row) => [row.id, row.stock]))
      return keys.map((id) => mapping.get(id) ?? [])
    })
  }
}
