import { useMemo } from 'react'

import { Loader, type LoaderProps } from './Loader'
import * as NamedComponents from './NamedLoaderComponents'

type Props<D, T> = LoaderProps<D> & { type: T }

export const GqlLoader = <D extends { __typename: string }, T extends D['__typename']>(props: Props<D, T>) => {
  const error = useMemo(() => {
    if (props.data?.__typename !== props.type) {
      return props.data
    }
  }, [props.data, props.type])

  const data = useMemo(() => {
    if (props.data?.__typename === props.type) {
      return props.data
    }
  }, [props.data, props.type])

  return (
    <Loader error={error} {...props} data={data}>
      {props.children}
    </Loader>
  )
}

GqlLoader.Loading = NamedComponents.Loading

GqlLoader.Error = NamedComponents.Error

GqlLoader.Empty = NamedComponents.Empty

export default GqlLoader
