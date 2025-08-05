import { Inject } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { InjectableProxy } from 'nestjs-cls'
import type { Database as DatabaseSchema } from 'src/supabase/generated/supabase.types'
import { Database } from 'src/supabase/proxies/database.proxy'

type Home = DatabaseSchema['public']['Tables']['homes']['Row']

@InjectableProxy()
export class HomeLoader extends DataLoader<string, Home | undefined> {
  @Inject(Database)
  private readonly database!: Database

  constructor() {
    super(async (keys) => {
      const { data, error } = await this.database.from('homes').select('*').in('id', keys)

      if (error) {
        throw new Error(`home query failed: ${error.message}`)
      }

      const mapping = new Map(data.map((row) => [row.id, row]))
      return keys.map((id) => mapping.get(id))
    })
  }
}
