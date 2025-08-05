import { ArgsType, createUnionType, Field, ID, ObjectType } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'

@ObjectType()
export class Store {
  constructor(initial: Writable<Store>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  id!: string
}

@ObjectType()
export class StoreEdge {
  constructor(initial: Writable<StoreEdge>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  cursor!: string

  @Field((_type) => Store)
  node!: Store
}

@ObjectType()
export class Stores {
  constructor(initial: Writable<Stores>) {
    Object.assign(this, initial)
  }

  @Field((_type) => [StoreEdge])
  edges!: StoreEdge[]
}

export const StoreOrError = createUnionType({ name: 'StoreOrError', types: () => [Store, GqlError] })

export const StoresOrError = createUnionType({ name: 'StoresOrError', types: () => [Stores, GqlError] })

@ArgsType()
export class NewStore {
  @Field((_type) => ID)
  id!: string

  @Field((_type) => ID)
  home!: string

  @Field((_type) => String)
  name!: string
}
