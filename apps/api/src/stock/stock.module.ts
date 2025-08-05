import { Module } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import { IngredientModule } from 'src/ingredient/ingredient.module'
import { ProfileModule } from 'src/profile/profile.module'
import { SupabaseModule } from 'src/supabase/supabase.module'

import { StockLoader } from './data-loaders/stock.loader'
import { StockByStoreLoader } from './data-loaders/stock-by-store.loader'
import { StockResolver } from './resolvers/stock.resolver'
import { StockService } from './services/stock.service'

@Module({
  exports: [StockService],
  imports: [
    ClsModule.forFeatureAsync({ imports: [SupabaseModule], useClass: StockLoader }),
    ClsModule.forFeatureAsync({ imports: [SupabaseModule], useClass: StockByStoreLoader }),
    SupabaseModule,
    IngredientModule,
    ProfileModule,
  ],
  providers: [StockResolver, StockService],
})
export class StockModule {}
