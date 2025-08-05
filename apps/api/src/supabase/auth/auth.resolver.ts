import { Inject, Logger } from '@nestjs/common'
import { Args, Mutation } from '@nestjs/graphql'
import { GqlError } from 'src/errors/errors.facade'

import { Database } from '../proxies/database.proxy'
import { Credentials, Tokens, UnauthenticatedError, Verified, VerifiedOrErorr } from './auth.facade'

export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name)

  @Inject(Database)
  private readonly database!: Database

  @Mutation(() => VerifiedOrErorr)
  async login(@Args({ type: () => Credentials }) payload: Credentials) {
    const { error, data } = await this.database.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    })

    if (error) {
      this.logger.warn('login failed', { error })
      return new GqlError(error)
    }

    const { session } = data
    if (!session) {
      return new UnauthenticatedError()
    }

    return new Verified({
      tokens: new Tokens({
        access: session.access_token,
        refresh: session.refresh_token,
      }),
    })
  }

  @Mutation(() => VerifiedOrErorr)
  async signup(@Args({ type: () => Credentials }) payload: Credentials) {
    const { error, data } = await this.database.auth.signUp({
      email: payload.email,
      password: payload.password,
    })

    if (error) {
      this.logger.error('signup failed', { error })
      return new GqlError(error)
    }

    const { session } = data
    if (!session) {
      return new UnauthenticatedError()
    }

    return new Verified({
      tokens: new Tokens({
        access: session.access_token,
        refresh: session.refresh_token,
      }),
    })
  }

  @Mutation((_type) => VerifiedOrErorr)
  async refresh(@Args('token') token: string) {
    const { data, error } = await this.database.auth.refreshSession({ refresh_token: token })
    if (error) {
      this.logger.error('failed to refresh session', { error })
      return new GqlError(error)
    }

    const { session } = data
    if (!session) {
      return new UnauthenticatedError()
    }

    return new Verified({
      tokens: new Tokens({
        access: session.access_token,
        refresh: session.refresh_token,
      }),
    })
  }
}
