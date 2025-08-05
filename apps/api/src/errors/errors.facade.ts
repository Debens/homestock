import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'

@ObjectType({ implements: () => GqlError })
@InterfaceType('IError')
export class GqlError {
  constructor(initial: Writable<GqlError>) {
    Object.assign(this, initial)
  }

  @Field({ nullable: true })
  message?: string
}
