import { ApolloClient, from, HttpLink, split } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition, Observable } from '@apollo/client/utilities'
import { CachePersistor, MMKVWrapper } from 'apollo3-cache-persist'
import type { GraphQLError } from 'graphql'
import { createClient } from 'graphql-ws'
import { MMKV } from 'react-native-mmkv'

import { tokens } from '../authentication/auth-tokens'
import {
  RefreshSessionDocument,
  type RefreshSessionMutation,
  type RefreshSessionMutationVariables,
} from '../graphql/generated/documents'
import { GeneralError } from '../utils/errors/general-error'
import { cache } from './apollo-cache'

if (__DEV__) {
  loadDevMessages()
  loadErrorMessages()
}

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const wsLink = new GraphQLWsLink(
  createClient({
    connectionParams: async () => ({
      headers: {
        authorization: 'TODO: store tokens and retrieve',
      },
    }),
    url: 'ws://localhost:4000/graphql',
  })
)

const protocol = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authentication = setContext(async (_, { headers = {} }) => {
  const token = tokens.access.read()
  if (token) {
    Object.assign(headers, { authorization: `Bearer ${token}` })
  }

  return { headers }
})

const retry = new RetryLink({
  attempts: { max: 5 },
  delay: {
    initial: 300,
    jitter: true,
    max: Number.POSITIVE_INFINITY,
  },
})

export const onRefreshTokens = async () => {
  const token = tokens.refresh.read()
  if (!token) {
    return false
  }

  return client
    .mutate<RefreshSessionMutation, RefreshSessionMutationVariables>({
      mutation: RefreshSessionDocument,
      variables: { token },
    })
    .then(({ data }) => {
      if (data?.refresh.__typename !== 'Verified') {
        throw new GeneralError(data?.refresh).handle()
      }

      tokens.access.write(data.refresh.tokens.access)
      tokens.refresh.write(data.refresh.tokens.refresh)

      return true
    })
    .catch(() => {
      Object.values(tokens).forEach((token) => token.clear())

      return false
    })
}

const isUnauthenticated = (err: Partial<GraphQLError>) => err.extensions?.code === 'UNAUTHENTICATED'
const refresh = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors?.find(isUnauthenticated)) {
    return new Observable((observer) => {
      onRefreshTokens()
        .then((success) => {
          if (!success) {
            observer.error({ message: 'unathorised' })
          }
          return forward(operation).subscribe({
            complete: observer.complete.bind(observer),
            error: observer.error.bind(observer),
            next: observer.next.bind(observer),
          })
        })
        .catch((err) => observer.error(err))
    })
  }
})

export const link = from([retry, refresh, authentication, protocol])

const mmkv = new MMKV({ encryptionKey: 'gql', id: 'apollo' })
const storage = new MMKVWrapper(mmkv)

new CachePersistor({
  cache,
  storage,
})
  .restore()
  .catch((err) => new GeneralError(err).context('apollo cache persistor').handle())

export const client = new ApolloClient({
  cache,
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
  link,
})
