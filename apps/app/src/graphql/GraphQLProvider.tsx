import { ApolloProvider } from '@apollo/client/react/context'

import { client } from './apollo-client'

export const GraphQLProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
