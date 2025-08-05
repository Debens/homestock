import { Module } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import { SupabaseModule } from 'src/supabase/supabase.module'

import { IngredientLoader } from './data-loaders/ingredient.loader'
import { IngredientResolver } from './resolvers/ingredient.resolver'
import { IngredientService } from './services/ingredient.service'

@Module({
  exports: [IngredientService],
  imports: [SupabaseModule, ClsModule.forFeatureAsync({ imports: [SupabaseModule], useClass: IngredientLoader })],
  providers: [IngredientResolver, IngredientService],
})
export class IngredientModule {}
