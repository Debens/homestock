import { Inject } from '@nestjs/common'
import { ResolveField, Resolver, Root } from '@nestjs/graphql'

import { ProfileNames } from '../profile.facade'
import { ProfileService } from '../services/profile.service'

@Resolver(ProfileNames)
export class ProfileNamesResolver {
  @Inject(ProfileService)
  private readonly profiles!: ProfileService

  @ResolveField((_type) => String)
  async first(@Root() root: ProfileNames) {
    return this.profiles.getById(root.profile).then((profile) => profile?.first_name)
  }

  @ResolveField((_type) => String)
  async last(@Root() root: ProfileNames) {
    return this.profiles.getById(root.profile).then((profile) => profile?.last_name)
  }

  @ResolveField((_type) => String)
  async full(@Root() root: ProfileNames) {
    return `${await this.first(root)} ${await this.last(root)}`
  }
}
