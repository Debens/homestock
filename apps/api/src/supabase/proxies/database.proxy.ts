import type { SupabaseClient } from '@supabase/supabase-js'

import type { Database as Schema } from '../generated/supabase.types'

export const Database = 'inject.token.database'
export type Database = SupabaseClient<Schema>
