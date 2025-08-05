import { ArgsType, createUnionType, Field, ID, ObjectType } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'

@ObjectType()
export class Ingredient {
  constructor(initial: Writable<Ingredient>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  id!: string
}

@ObjectType()
export class IngredientEdge {
  constructor(initial: Writable<IngredientEdge>) {
    Object.assign(this, initial)
  }

  @Field((_type) => ID)
  cursor!: string

  @Field((_type) => Ingredient)
  node!: Ingredient
}

@ObjectType()
export class Ingredients {
  constructor(initial: Writable<Ingredients>) {
    Object.assign(this, initial)
  }

  @Field((_type) => [IngredientEdge])
  edges!: IngredientEdge[]
}

export const IngredientOrError = createUnionType({ name: 'IngredientOrError', types: () => [Ingredient, GqlError] })

@ArgsType()
export class NewIngredient {
  @Field((_type) => ID)
  id!: string

  @Field((_type) => String)
  name!: string
}
