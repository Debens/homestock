import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'

import type { QueryResult } from '@apollo/client'

import {
  type HomeFragment,
  type HomesQuery,
  type HomesQueryVariables,
  useHomesQuery,
} from '@/src/graphql/generated/documents'
import { GeneralError } from '@/src/utils/errors/general-error'

type Context = {
  query: QueryResult<HomesQuery, HomesQueryVariables>
  current?: HomeFragment
  select: (home: HomeFragment) => void
}

const HomeContext = createContext<Context | null>(null)

export const HomeProvider: React.FC<PropsWithChildren> = (props) => {
  const query = useHomesQuery()
  const [current, select] = useState<HomeFragment>()

  const homes = query.data?.viewer.homes.edges
  useEffect(() => {
    const first = homes?.at(0)?.node
    if (!current && first) {
      select(first)
    }
  }, [current, homes])

  return <HomeContext.Provider value={{ current, query, select }}>{props.children}</HomeContext.Provider>
}

const useHomeContext = () => {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeProvider')
  }

  return context
}

export const useCurrentHome = () => {
  const { query, current, select } = useHomeContext()

  return [current, Object.assign({ select }, query)] as const
}

const EMPTY_STRING = ''
export const useCurrentHomeId = () => {
  const { current } = useHomeContext()

  if (!current) {
    new GeneralError('no current home selected').handle()

    return EMPTY_STRING
  }

  return current.id
}
