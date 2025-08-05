import type { User as SupabaseUser } from '@supabase/supabase-js'
import { InjectableProxy } from 'nestjs-cls'

@InjectableProxy()
export class User {
  id!: string

  created!: string

  email!: string

  jwt!: string

  init = (token: string, user: SupabaseUser) => {
    this.id = user.id
    this.created = user.created_at
    this.jwt = token

    if (!user.email) {
      throw new Error('user is missing email')
    }

    this.email = user.email

    return this
  }
}
