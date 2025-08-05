import { ArgsType, createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'

@ArgsType()
export class Credentials {
  @Field((_type) => String)
  email!: string

  @Field((_type) => String)
  password!: string
}

@ArgsType()
export class VerifyToken {
  constructor(initial: Writable<VerifyToken>) {
    Object.assign(this, initial)
  }

  @Field({ description: 'token_hash in magic link' })
  token!: string
}

@ObjectType()
export class Tokens {
  constructor(initial: Writable<Tokens>) {
    Object.assign(this, initial)
  }
  @Field()
  access!: string

  @Field()
  refresh!: string
}

@ObjectType()
export class Verified {
  constructor(initial: Writable<Verified>) {
    Object.assign(this, initial)
  }

  @Field(() => Tokens)
  tokens!: Tokens
}

@ObjectType()
export class UnauthenticatedError {
  @Field(() => String)
  message = 'Unauthenticated'
}

export const VerifiedOrErorr = createUnionType({
  name: 'AuthResult',
  types: () => [Verified, UnauthenticatedError, GqlError],
})
