import { Inject } from '@nestjs/common'
import { Int, ResolveField, Resolver, Root } from '@nestjs/graphql'

import { Profile } from '../profile.facade'
import { ProfileService } from '../services/profile.service'

@Resolver(Profile)
export class ProfileResolver {
  @Inject(ProfileService)
  private readonly profiles!: ProfileService

  @ResolveField((_type) => Int)
  async no(@Root() root: Profile) {
    return this.profiles.getById(root.id).then((profile) => profile?.profile_no)
  }
}
