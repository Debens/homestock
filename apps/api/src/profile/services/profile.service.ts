import { Inject } from '@nestjs/common'

import { ProfileLoader } from '../data-loaders/profile.loader'

export class ProfileService {
  @Inject(ProfileLoader)
  private readonly profiles!: ProfileLoader

  async getById(profile: string) {
    return this.profiles.load(profile)
  }
}
