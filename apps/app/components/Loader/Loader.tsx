import { Fragment, useEffect, useMemo, useRef } from 'react'

import { allPass, complement, isEmpty, isNil } from 'ramda'
import type { AnimatedProps } from 'react-native-reanimated'
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated'

import { standard } from '../../src/utils/easing'
import { isElement } from '../../src/utils/is-element'
import { ENTERING, EXITING } from '../../src/utils/speeds'
import * as NamedComponents from './NamedLoaderComponents'

// biome-ignore lint/suspicious/noExplicitAny: extension only
type AnyElement = React.ReactElement<unknown, any>
type RenderFunction<P> = (props: P) => AnyElement | null

type ChildrenType<P> = React.ReactNode | RenderFunction<{ data: NonNullable<P> }>

type Children<P> = ChildrenType<P> | Iterable<ChildrenType<P>>

type ViewProps = Omit<React.ComponentProps<typeof Animated.View>, 'children'>
type AnimatedViewProps = AnimatedProps<ViewProps>
export type LoaderProps<D, T extends D, U> = ViewProps & {
  loading?: boolean
  data?: D
  error?: unknown
  debug?: boolean | LoadingState
  children?: Children<U>
  guard?: (data: D) => data is T
  map?: (data: T) => U
  entering?: AnimatedViewProps['entering']
  exiting?: AnimatedViewProps['exiting']
}

const toArray = <D,>(children?: Children<D>): Array<Children<D>> => (Array.isArray(children) ? children : [children])

const isDataPresent = <D, P extends { data?: D }>(props: P): props is P & { data: NonNullable<D> } =>
  isDataRequired(props) ? !isNil(props.data) && !isEmpty(props.data) : false

const isDataRequired = <D, P extends { data?: D }>(props: P): props is P & { data: D } =>
  Object.keys(props).includes('data')

const easing = standard.factory()
const EXITING_ANIMATION = FadeOut.duration(EXITING).easing(easing)
const ENTERING_ANIMATION = FadeInDown.duration(ENTERING).easing(easing).springify().damping(16).stiffness(130)

type LoadingState = 'loading' | 'error' | 'empty' | 'ready'
const getTreeFilterForState = (state: LoadingState) => {
  switch (state) {
    case 'loading':
      return isElement(Loader.Loading)
    case 'error':
      return isElement(Loader.Error)
    case 'empty':
      return isElement(Loader.Empty)
    case 'ready': {
      return [Loader.Loading, Loader.Error, Loader.Empty]
        .map(isElement)
        .map((pred) => complement(pred))
        .reduce((a, b) => allPass([a, b]))
    }
  }
}

const useOnNextRender = <T,>(value: T) => {
  const rendering = useRef(true)
  useEffect(() => {
    rendering.current = false
  }, [])

  if (rendering.current) {
    return undefined
  }

  return value
}

export const Loader = <D, T extends D = D, U = T>(props: LoaderProps<D, T, U>) => {
  const children = toArray(props.children)

  const isPresent = useMemo(() => isDataPresent(props), [props])
  const data = useMemo<U | undefined>(() => {
    if (!isPresent || !props.data) {
      return undefined
    }

    if (props.guard?.(props.data)) {
      if (props.map) {
        return props.map(props.data)
      }

      return props.data as U
    }

    return props.data as U
  }, [props.data, props.guard, isPresent, props.map])

  const isRequired = useMemo(() => isDataRequired(props), [props])
  const { debug, error, loading } = props
  const state = useMemo<LoadingState>(() => {
    if (debug) {
      return typeof debug === 'string' ? debug : 'loading'
    }

    if (error) {
      return 'error'
    }

    if (loading) {
      return 'loading'
    }

    if (isRequired) {
      if (isNil(data) || isEmpty(data)) {
        return 'empty'
      }
    }

    return 'ready'
  }, [debug, error, loading, isRequired, data])

  /**
   * Filter out the relevant components based on the current state.
   *
   * This method hands the case of render functions, this means the component will only be mounted when the state is matching.
   */
  const content = children.filter(getTreeFilterForState(state)).map((Element, index) => {
    if (typeof Element === 'function') {
      if (state === 'ready' && data) {
        return <Fragment key={index}>{Element({ data })}</Fragment>
      }
      const State = Element as RenderFunction<{}>
      return <Fragment key={index}>{State({})}</Fragment>
    }

    return Element
  })

  const entering = useOnNextRender(ENTERING_ANIMATION)

  /* don't render empty components, empty views contribute to styling computations. e.g. flex-gap  */
  return content.length > 0 ? (
    /* a change in rendered state, e.g. mount/unmount, will trigger the animation due to key */
    <Animated.View key={state} entering={entering} exiting={EXITING_ANIMATION} {...props}>
      <>{content}</>
    </Animated.View>
  ) : null
}

Loader.Loading = NamedComponents.Loading

Loader.Error = NamedComponents.Error

Loader.Empty = NamedComponents.Empty

export default Loader
