import { Module } from '@nestjs/common'
import { ConfigModule, type ConfigType } from '@nestjs/config'
import { createClient as supabase } from '@supabase/supabase-js'
import { CLS_REQ, ClsModule } from 'nestjs-cls'

import { AuthResolver } from './auth/auth.resolver'
import { SupabaseStrategy } from './auth/supabase.strategy'
import { Database } from './proxies/database.proxy'
import { User } from './proxies/user.proxy'
import supabaseConfig from './supabase.config'

const DynamicUser = ClsModule.forFeature(User)

@Module({
  exports: [DynamicUser],
  imports: [
    DynamicUser,
    ClsModule.forFeatureAsync({
      imports: [ConfigModule.forFeature(supabaseConfig)],
      inject: [supabaseConfig.KEY, CLS_REQ],
      provide: Database,
      useFactory: (config: ConfigType<typeof supabaseConfig>, request: Request) => {
        return supabase(config.url, config.key, {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
          global: { headers: { Authorization: `Bearer ${SupabaseStrategy.extractor(request)}` } },
        })
      },
    }),
  ],
  providers: [AuthResolver, SupabaseStrategy],
})
export class SupabaseModule {}
