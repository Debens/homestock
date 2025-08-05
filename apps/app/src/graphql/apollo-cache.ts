import { InMemoryCache } from '@apollo/client'

import fragments from './generated/fragments'

export const cache = new InMemoryCache({
  possibleTypes: fragments.possibleTypes,
  typePolicies: {
    Homes: { merge: true },
  },
})
