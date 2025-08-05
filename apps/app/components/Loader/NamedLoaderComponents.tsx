/**
 * These are named component that are used in the Loader render function.
 *
 * They are split out into their own file to ensure they don't get dereferenced during FastRefresh.
 *
 * If you save this file then the Loader component will be evaluating `isElement` against new references, causing development only render issues..
 */

type LoadingProps = { children: React.ReactNode }
export const Loading: React.FunctionComponent<LoadingProps> = (props) => <>{props.children}</>

type ErrorProps = { children?: React.ReactNode }
export const Error: React.FunctionComponent<ErrorProps> = (props) => <>{props.children}</>

type EmptyProps = { children?: React.ReactNode }
export const Empty: React.FunctionComponent<EmptyProps> = (props) => <>{props.children}</>
