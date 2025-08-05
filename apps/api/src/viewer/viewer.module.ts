import { Module } from '@nestjs/common'
import { HomeModule } from 'src/home/home.module'
import { ProfileModule } from 'src/profile/profile.module'
import { StockModule } from 'src/stock/stock.module'
import { SupabaseModule } from 'src/supabase/supabase.module'

import { ViewerResolver } from './viewer.resolver'

@Module({ imports: [SupabaseModule, HomeModule, ProfileModule, StockModule], providers: [ViewerResolver] })
export class ViewerModule {}
