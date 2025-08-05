import { Inject } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { InjectableProxy } from 'nestjs-cls'
import type { Database as DatabaseSchema } from 'src/supabase/generated/supabase.types'
import { Database } from 'src/supabase/proxies/database.proxy'

type Profile = DatabaseSchema['public']['Tables']['profiles']['Row']

@InjectableProxy()
export class ProfileLoader extends DataLoader<string, Profile | undefined> {
  @Inject(Database)
  private readonly database!: Database

  constructor() {
    super(async (keys) => {
      const { data, error } = await this.database.from('profiles').select('*').in('profile_id', keys)

      if (error) {
        throw new Error(`profile query failed: ${error.message}`)
      }

      const mapping = new Map(data.map((row) => [row.id, row]))
      return keys.map((id) => mapping.get(id))
    })
  }
}
