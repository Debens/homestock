import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import type { Request } from 'express'
import { Strategy } from 'passport-custom'
import { ExtractJwt } from 'passport-jwt'

import { Database } from '../proxies/database.proxy'
import { User } from '../proxies/user.proxy'

const fromCookie = (name: string) => (request: Request) => request.cookies?.[name] ?? null

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  @Inject(Database)
  private readonly database!: Database

  @Inject(User)
  private readonly user!: User

  static extractor = ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), fromCookie('sidekick')])

  get UnauthorizedException() {
    return Object.assign(new UnauthorizedException(), {
      extensions: {
        http: { status: 401 },
        level: 'warn',
      },
    })
  }

  async validate(request: Request) {
    const token = SupabaseStrategy.extractor(request)
    if (token == null) {
      throw this.UnauthorizedException
    }

    const { data, error } = await this.database.auth.getUser(token)
    if (error) {
      throw this.UnauthorizedException
    }

    return this.user.init(token, data.user)
  }
}
