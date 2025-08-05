import { isValidElement } from 'react'

// biome-ignore lint/suspicious/noExplicitAny: handle any
type Child<P = any> = React.ReactNode | React.JSXElementConstructor<P>

export const isElement =
  <Props>(Component: React.JSXElementConstructor<Props>) =>
  (element: Child): element is React.ReactElement<Props> =>
    isValidElement(element) ? element.type === Component : false
