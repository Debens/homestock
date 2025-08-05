export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}

export const isTypename =
  <T extends string>(type: T) =>
  <D extends { __typename: T | ({} & string) }>(data?: D | null): data is Pretty<Extract<D, { __typename: T }>> =>
    data?.__typename === type
