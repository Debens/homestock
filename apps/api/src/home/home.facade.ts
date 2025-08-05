import { ArgsType, createUnionType, Field, ID, ObjectType } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'

@ObjectType()
export class Home {
  constructor(initial: Writable<Home>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  id!: string
}

@ObjectType()
export class HomeEdge {
  constructor(initial: Writable<HomeEdge>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  cursor!: string

  @Field((_type) => Home)
  node!: Home
}

@ObjectType()
export class Homes {}

@ObjectType()
export class HomeNotFoundError {
  constructor(initial: Writable<HomeNotFoundError>) {
    Object.assign(this, initial)
  }

  @Field(() => String)
  readonly message = 'home not found'

  @Field((_type) => ID)
  id!: string
}

export const HomeOrError = createUnionType({ name: 'HomeOrError', types: () => [Home, HomeNotFoundError, GqlError] })

@ArgsType()
export class NewHome {
  @Field((_type) => ID)
  id!: string

  @Field((_type) => String)
  name!: string
}
