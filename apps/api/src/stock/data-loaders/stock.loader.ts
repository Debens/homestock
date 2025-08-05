import { Inject } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { InjectableProxy } from 'nestjs-cls'
import type { Database as DatabaseSchema } from 'src/supabase/generated/supabase.types'
import { Database } from 'src/supabase/proxies/database.proxy'

type stock = DatabaseSchema['public']['Tables']['stock']['Row']

@InjectableProxy()
export class StockLoader extends DataLoader<string, stock | undefined> {
  @Inject(Database)
  private readonly database!: Database

  constructor() {
    super(async (keys) => {
      const { data, error } = await this.database.from('stock').select('*').in('id', keys)

      if (error) {
        throw new Error(`stock query failed: ${error.message}`)
      }

      const mapping = new Map(data.map((row) => [row.id, row]))
      return keys.map((id) => mapping.get(id))
    })
  }
}
