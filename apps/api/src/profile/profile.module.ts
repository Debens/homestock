import { Module } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import { SupabaseModule } from 'src/supabase/supabase.module'

import { ProfileLoader } from './data-loaders/profile.loader'
import { ProfileResolver } from './resolvers/profile.resolver'
import { ProfileNamesResolver } from './resolvers/profile-names.resolver'
import { ProfileService } from './services/profile.service'

@Module({
  exports: [ProfileService],
  imports: [SupabaseModule, ClsModule.forFeatureAsync({ imports: [SupabaseModule], useClass: ProfileLoader })],
  providers: [ProfileResolver, ProfileNamesResolver, ProfileService],
})
export class ProfileModule {}
