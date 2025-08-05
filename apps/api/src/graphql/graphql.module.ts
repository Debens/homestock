import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule as CoreGraphQLModule } from '@nestjs/graphql'
import { DateResolver, DateTimeResolver, DurationResolver } from 'graphql-scalars'
import { join } from 'path'

import { DurationScalar } from './duration.scalar'

type GlobalContext = {
  req: Request
  res: Response
}

/* fix for the description with line breaks that gql files cannot handle */
Object.assign(DurationResolver, { description: DurationResolver.description?.split('\n').join('') })

@Module({
  imports: [
    CoreGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: process.env.NODE_ENV === 'production' ? true : join(process.cwd(), 'schema.graphql'),
        buildSchemaOptions: {
          scalarsMap: [
            { name: 'Date', scalar: DateResolver, type: Date },
            { name: 'DateTime', scalar: DateTimeResolver, type: Date },
          ],
        },
        context: (ctx: GlobalContext) => ctx,
        fieldResolverEnhancers: ['guards'],
        graphiql: process.env.NODE_ENV !== 'production',
        installSubscriptionHandlers: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        sortSchema: true,

        subscriptions: {
          'graphql-ws': true,
        },
      }),
    }),
  ],
  providers: [DurationScalar],
})
export class GraphQLModule {}
