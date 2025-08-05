import { ArgsType, createUnionType, Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'
import { type Duration, DurationScalar } from 'src/graphql/duration.scalar'

@ObjectType()
export class Stock {
  constructor(initial: Writable<Stock>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  id!: string
}

@ObjectType()
export class StockEdge {
  constructor(initial: Writable<StockEdge>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  cursor!: string

  @Field((_type) => Stock)
  node!: Stock
}

@ObjectType()
export class Inventory {
  constructor(initial: Writable<Inventory>) {
    Object.assign(this, initial)
  }

  @Field((_type) => [StockEdge])
  edges!: StockEdge[]
}

export const StockOrError = createUnionType({ name: 'StockOrError', types: () => [Stock, GqlError] })

export const InventoryOrError = createUnionType({ name: 'InventoryOrError', types: () => [Inventory, GqlError] })

@ArgsType()
export class NewStock {
  @Field((_type) => ID)
  id!: string

  @Field((_type) => ID)
  store!: string

  @Field((_type) => ID)
  ingredient!: string

  @Field((_type) => Date, { nullable: true })
  expiry?: Date

  @Field((_type) => Int, { nullable: true })
  quantity?: number
}

@ArgsType()
export class NewStockByNameOnly {
  @Field((_type) => ID)
  id!: string

  @Field((_type) => ID)
  store!: string

  @Field((_type) => String)
  name!: string

  @Field((_type) => Date, { nullable: true })
  expiry?: Date

  @Field((_type) => Int, { nullable: true })
  quantity?: number
}

@ArgsType()
export class StockSearch {
  @Field((_type) => DurationScalar, { nullable: true })
  expiresIn?: Duration

  @Field((_type) => ID, { nullable: true })
  home?: string

  @Field((_type) => Int, { nullable: true })
  first?: number
}
