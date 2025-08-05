import { Module } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import { StockModule } from 'src/stock/stock.module'
import { StoreModule } from 'src/store/store.module'
import { SupabaseModule } from 'src/supabase/supabase.module'

import { HomeLoader } from './data-loaders/home.loader'
import { HomeResolver } from './resolvers/home.resolver'
import { HomesResolver } from './resolvers/homes.resolver'

@Module({
  imports: [
    ClsModule.forFeatureAsync({ imports: [SupabaseModule], useClass: HomeLoader }),
    SupabaseModule,
    StoreModule,
    StockModule,
  ],
  providers: [HomesResolver, HomeResolver],
})
export class HomeModule {}
