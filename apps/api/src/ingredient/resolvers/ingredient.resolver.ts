import { Inject, Logger, UseGuards } from '@nestjs/common'
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'
import { SessionGuard } from 'src/supabase/auth/session.guard'
import { Database } from 'src/supabase/proxies/database.proxy'
import { User } from 'src/supabase/proxies/user.proxy'

import { Ingredient, IngredientOrError, NewIngredient } from '../ingredient.facade'
import { IngredientService } from '../services/ingredient.service'

@Resolver(Ingredient)
export class IngredientResolver {
  private readonly logger = new Logger(IngredientResolver.name)

  @Inject(Database)
  private readonly database!: Database

  @Inject(User)
  private readonly user!: User

  @Inject(IngredientService)
  private readonly ingredients!: IngredientService

  @ResolveField((_type) => String)
  async name(@Root() root: Ingredient) {
    return this.ingredients.getById(root.id).then((ingredient) => ingredient?.name)
  }

  @Mutation(() => IngredientOrError)
  @UseGuards(SessionGuard)
  async newIngredient(@Args({ type: () => NewIngredient }) payload: NewIngredient) {
    const { error } = await this.database
      .from('ingredients')
      .insert({ created_by: this.user.id, id: payload.id, name: payload.name })

    if (error) {
      this.logger.error('failed to create new ingredient', { error })
      return new GqlError({ message: error.message })
    }

    return new Ingredient(payload)
  }
}
