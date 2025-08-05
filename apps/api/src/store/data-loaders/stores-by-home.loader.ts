import { Inject } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { InjectableProxy } from 'nestjs-cls'
import type { Database as DatabaseSchema } from 'src/supabase/generated/supabase.types'
import { Database } from 'src/supabase/proxies/database.proxy'

type Store = DatabaseSchema['public']['Tables']['stores']['Row']

@InjectableProxy()
export class StoresByHomeLoader extends DataLoader<string, Store[]> {
  @Inject(Database)
  private readonly database!: Database

  constructor() {
    super(async (keys) => {
      const { data, error } = await this.database
        .from('homes')
        .select(`
          id,
          stores (
            *
          )
        `)
        .in('id', keys)

      if (error) {
        throw new Error(`store query failed: ${error.message}`)
      }

      const mapping = new Map(data.map((row) => [row.id, row.stores]))
      return keys.map((id) => mapping.get(id) ?? [])
    })
  }
}
