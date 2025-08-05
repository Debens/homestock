import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'
import { Homes } from 'src/home/home.facade'

@ObjectType()
export class Viewer {
  constructor(initial: Writable<Viewer>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  id!: String

  @Field((_type) => Homes)
  readonly homes = new Homes()
}

export const ViewerOrError = createUnionType({ name: 'ViewerOrError', types: () => [Viewer, GqlError] })
