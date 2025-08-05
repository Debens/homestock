import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'

@ObjectType()
export class ProfileNames {
  constructor(initial: Writable<ProfileNames>) {
    Object.assign(this, initial)
  }

  profile: string
}

@ObjectType()
export class Profile {
  constructor(initial: Writable<Profile>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  id!: string

  @Field((_type) => ProfileNames)
  readonly names = new ProfileNames({ profile: this.id })
}

@ObjectType()
export class ProfileEdge {
  constructor(initial: Writable<ProfileEdge>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  cursor!: string

  @Field((_type) => Profile)
  node!: Profile
}

@ObjectType()
export class Profiles {
  constructor(initial: Writable<Profiles>) {
    Object.assign(this, initial)
  }

  @Field((_type) => [ProfileEdge])
  edges!: ProfileEdge[]
}

export const ProfileOrError = createUnionType({ name: 'ProfileOrError', types: () => [Profile, GqlError] })
