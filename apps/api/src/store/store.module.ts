import { Module } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import { StockModule } from 'src/stock/stock.module'
import { SupabaseModule } from 'src/supabase/supabase.module'

import { StoreLoader } from './data-loaders/store.loader'
import { StoresByHomeLoader } from './data-loaders/stores-by-home.loader'
import { StoreResolver } from './resolvers/store.resolver'
import { StoreService } from './services/store.service'

@Module({
  exports: [StoreService],
  imports: [
    ClsModule.forFeatureAsync({ imports: [SupabaseModule], useClass: StoreLoader }),
    ClsModule.forFeatureAsync({ imports: [SupabaseModule], useClass: StoresByHomeLoader }),
    SupabaseModule,
    StockModule,
  ],
  providers: [StoreResolver, StoreService],
})
export class StoreModule {}
