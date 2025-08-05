import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: string; output: string; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** ISO 8601 duration */
  Duration: { input: string; output: string; }
};

export type App = {
  __typename?: 'App';
  version: Scalars['String']['output'];
};

export type AuthResult = GqlError | UnauthenticatedError | Verified;

export type GqlError = IError & {
  __typename?: 'GqlError';
  message?: Maybe<Scalars['String']['output']>;
};

export type Home = {
  __typename?: 'Home';
  id: Scalars['ID']['output'];
  inventory: InventoryOrError;
  name: Scalars['String']['output'];
  stores: StoresOrError;
};


export type HomeInventoryArgs = {
  expiresIn?: InputMaybe<Scalars['Duration']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  home?: InputMaybe<Scalars['ID']['input']>;
};

export type HomeEdge = {
  __typename?: 'HomeEdge';
  cursor: Scalars['ID']['output'];
  node: Home;
};

export type HomeNotFoundError = {
  __typename?: 'HomeNotFoundError';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type HomeOrError = GqlError | Home | HomeNotFoundError;

export type Homes = {
  __typename?: 'Homes';
  byId: HomeOrError;
  edges: Array<HomeEdge>;
};


export type HomesByIdArgs = {
  id: Scalars['ID']['input'];
};

export type IError = {
  message?: Maybe<Scalars['String']['output']>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type IngredientEdge = {
  __typename?: 'IngredientEdge';
  cursor: Scalars['ID']['output'];
  node: Ingredient;
};

export type IngredientOrError = GqlError | Ingredient;

export type Inventory = {
  __typename?: 'Inventory';
  edges: Array<StockEdge>;
};

export type InventoryOrError = GqlError | Inventory;

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResult;
  newHome: HomeOrError;
  newIngredient: IngredientOrError;
  newStock: StockOrError;
  newStockByNameOnly: StockOrError;
  newStore: StoreOrError;
  refresh: AuthResult;
  signup: AuthResult;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationNewHomeArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationNewIngredientArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationNewStockArgs = {
  expiry?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['ID']['input'];
  ingredient: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  store: Scalars['ID']['input'];
};


export type MutationNewStockByNameOnlyArgs = {
  expiry?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  store: Scalars['ID']['input'];
};


export type MutationNewStoreArgs = {
  home: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationRefreshArgs = {
  token: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID']['output'];
  names: ProfileNames;
  no: Scalars['Int']['output'];
};

export type ProfileEdge = {
  __typename?: 'ProfileEdge';
  cursor: Scalars['ID']['output'];
  node: Profile;
};

export type ProfileNames = {
  __typename?: 'ProfileNames';
  first: Scalars['String']['output'];
  full: Scalars['String']['output'];
  last: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  app: App;
  viewer: Viewer;
};

export type Stock = {
  __typename?: 'Stock';
  createdBy: Profile;
  createdOn: Scalars['DateTime']['output'];
  expiresOn?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  ingredient: Ingredient;
  quantity: Scalars['Int']['output'];
};

export type StockEdge = {
  __typename?: 'StockEdge';
  cursor: Scalars['ID']['output'];
  node: Stock;
};

export type StockOrError = GqlError | Stock;

export type Store = {
  __typename?: 'Store';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  stock: InventoryOrError;
};

export type StoreEdge = {
  __typename?: 'StoreEdge';
  cursor: Scalars['ID']['output'];
  node: Store;
};

export type StoreOrError = GqlError | Store;

export type Stores = {
  __typename?: 'Stores';
  edges: Array<StoreEdge>;
};

export type StoresOrError = GqlError | Stores;

export type Tokens = {
  __typename?: 'Tokens';
  access: Scalars['String']['output'];
  refresh: Scalars['String']['output'];
};

export type UnauthenticatedError = {
  __typename?: 'UnauthenticatedError';
  message: Scalars['String']['output'];
};

export type Verified = {
  __typename?: 'Verified';
  tokens: Tokens;
};

export type Viewer = {
  __typename?: 'Viewer';
  createdOn: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  homes: Homes;
  id: Scalars['ID']['output'];
  inventory: InventoryOrError;
  profile?: Maybe<Profile>;
};


export type ViewerInventoryArgs = {
  expiresIn?: InputMaybe<Scalars['Duration']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  home?: InputMaybe<Scalars['ID']['input']>;
};

export type HomeFragment = { __typename: 'Home', id: string, name: string };

type HomeOrError_GqlError_Fragment = { __typename: 'GqlError', message?: string | null };

type HomeOrError_Home_Fragment = { __typename: 'Home', id: string, name: string, stores: { __typename: 'GqlError', message?: string | null } | { __typename: 'Stores', edges: Array<{ __typename?: 'StoreEdge', cursor: string, node: { __typename: 'Store', id: string, name: string, stock: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } } }> }, inventory: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } };

type HomeOrError_HomeNotFoundError_Fragment = { __typename: 'HomeNotFoundError' };

export type HomeOrErrorFragment = HomeOrError_GqlError_Fragment | HomeOrError_Home_Fragment | HomeOrError_HomeNotFoundError_Fragment;

export type HomesQueryVariables = Exact<{ [key: string]: never; }>;


export type HomesQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, homes: { __typename?: 'Homes', edges: Array<{ __typename?: 'HomeEdge', cursor: string, node: { __typename: 'Home', id: string, name: string } }> } } };

export type HomeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HomeQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, homes: { __typename?: 'Homes', byId: { __typename: 'GqlError', message?: string | null } | { __typename: 'Home', id: string, name: string, stores: { __typename: 'GqlError', message?: string | null } | { __typename: 'Stores', edges: Array<{ __typename?: 'StoreEdge', cursor: string, node: { __typename: 'Store', id: string, name: string, stock: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } } }> }, inventory: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } } | { __typename: 'HomeNotFoundError' } } } };

export type NewHomeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type NewHomeMutation = { __typename?: 'Mutation', newHome: { __typename: 'GqlError', message?: string | null } | { __typename: 'Home', id: string, name: string } | { __typename: 'HomeNotFoundError' } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'GqlError', message?: string | null } | { __typename: 'UnauthenticatedError' } | { __typename: 'Verified', tokens: { __typename?: 'Tokens', access: string, refresh: string } } };

export type RefreshSessionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshSessionMutation = { __typename?: 'Mutation', refresh: { __typename: 'GqlError', message?: string | null } | { __typename: 'UnauthenticatedError' } | { __typename: 'Verified', tokens: { __typename?: 'Tokens', access: string, refresh: string } } };

export type HomePageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HomePageQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, homes: { __typename?: 'Homes', byId: { __typename: 'GqlError', message?: string | null } | { __typename: 'Home', id: string, name: string, stores: { __typename: 'GqlError', message?: string | null } | { __typename: 'Stores', edges: Array<{ __typename?: 'StoreEdge', cursor: string, node: { __typename: 'Store', id: string, name: string, stock: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } } }> }, inventory: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } } | { __typename: 'HomeNotFoundError' } } } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename: 'GqlError', message?: string | null } | { __typename: 'UnauthenticatedError' } | { __typename: 'Verified', tokens: { __typename?: 'Tokens', access: string, refresh: string } } };

export type StockFragment = { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } };

type InventoryOrError_GqlError_Fragment = { __typename: 'GqlError', message?: string | null };

type InventoryOrError_Inventory_Fragment = { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> };

export type InventoryOrErrorFragment = InventoryOrError_GqlError_Fragment | InventoryOrError_Inventory_Fragment;

export type InventoryQueryVariables = Exact<{
  home: Scalars['ID']['input'];
}>;


export type InventoryQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, homes: { __typename?: 'Homes', byId: { __typename: 'GqlError', message?: string | null } | { __typename: 'Home', id: string, inventory: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } } | { __typename: 'HomeNotFoundError' } } } };

export type NewStockMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  store: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  expiry?: InputMaybe<Scalars['Date']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewStockMutation = { __typename?: 'Mutation', newStockByNameOnly: { __typename: 'GqlError', message?: string | null } | { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } };

export type StoreFragment = { __typename: 'Store', id: string, name: string };

type StoresOrError_GqlError_Fragment = { __typename: 'GqlError', message?: string | null };

type StoresOrError_Stores_Fragment = { __typename: 'Stores', edges: Array<{ __typename?: 'StoreEdge', cursor: string, node: { __typename: 'Store', id: string, name: string, stock: { __typename: 'GqlError', message?: string | null } | { __typename: 'Inventory', edges: Array<{ __typename?: 'StockEdge', cursor: string, node: { __typename: 'Stock', id: string, quantity: number, createdOn: string, expiresOn?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: string } } }> } } }> };

export type StoresOrErrorFragment = StoresOrError_GqlError_Fragment | StoresOrError_Stores_Fragment;

export type StoresQueryVariables = Exact<{
  home: Scalars['ID']['input'];
}>;


export type StoresQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, homes: { __typename?: 'Homes', byId: { __typename: 'GqlError', message?: string | null } | { __typename: 'Home', id: string, stores: { __typename: 'GqlError', message?: string | null } | { __typename: 'Stores', edges: Array<{ __typename?: 'StoreEdge', cursor: string, node: { __typename: 'Store', id: string, name: string } }> } } | { __typename: 'HomeNotFoundError' } } } };

export type NewStoreMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  home: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type NewStoreMutation = { __typename?: 'Mutation', newStore: { __typename: 'GqlError', message?: string | null } | { __typename: 'Store', id: string, name: string } };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, email: string, createdOn: string } };

export const HomeFragmentDoc = gql`
    fragment Home on Home {
  __typename
  id
  name
}
    `;
export const StoreFragmentDoc = gql`
    fragment Store on Store {
  __typename
  id
  name
}
    `;
export const StockFragmentDoc = gql`
    fragment Stock on Stock {
  __typename
  id
  ingredient {
    id
    name
  }
  quantity
  createdOn
  expiresOn
}
    `;
export const InventoryOrErrorFragmentDoc = gql`
    fragment InventoryOrError on InventoryOrError {
  __typename
  ... on IError {
    message
  }
  ... on Inventory {
    edges {
      cursor
      node {
        ...Stock
      }
    }
  }
}
    ${StockFragmentDoc}`;
export const StoresOrErrorFragmentDoc = gql`
    fragment StoresOrError on StoresOrError {
  __typename
  ... on IError {
    message
  }
  ... on Stores {
    edges {
      cursor
      node {
        ...Store
        stock {
          ...InventoryOrError
        }
      }
    }
  }
}
    ${StoreFragmentDoc}
${InventoryOrErrorFragmentDoc}`;
export const HomeOrErrorFragmentDoc = gql`
    fragment HomeOrError on HomeOrError {
  __typename
  ... on IError {
    message
  }
  ... on Home {
    ...Home
    stores {
      ...StoresOrError
    }
    inventory(expiresIn: "P7D", first: 3) {
      ...InventoryOrError
    }
  }
}
    ${HomeFragmentDoc}
${StoresOrErrorFragmentDoc}
${InventoryOrErrorFragmentDoc}`;
export const HomesDocument = gql`
    query Homes {
  viewer {
    id
    homes {
      edges {
        cursor
        node {
          ...Home
        }
      }
    }
  }
}
    ${HomeFragmentDoc}`;

/**
 * __useHomesQuery__
 *
 * To run a query within a React component, call `useHomesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomesQuery(baseOptions?: Apollo.QueryHookOptions<HomesQuery, HomesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomesQuery, HomesQueryVariables>(HomesDocument, options);
      }
export function useHomesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomesQuery, HomesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomesQuery, HomesQueryVariables>(HomesDocument, options);
        }
export function useHomesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HomesQuery, HomesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HomesQuery, HomesQueryVariables>(HomesDocument, options);
        }
export type HomesQueryHookResult = ReturnType<typeof useHomesQuery>;
export type HomesLazyQueryHookResult = ReturnType<typeof useHomesLazyQuery>;
export type HomesSuspenseQueryHookResult = ReturnType<typeof useHomesSuspenseQuery>;
export type HomesQueryResult = Apollo.QueryResult<HomesQuery, HomesQueryVariables>;
export const HomeDocument = gql`
    query Home($id: ID!) {
  viewer {
    id
    homes {
      byId(id: $id) {
        ...HomeOrError
      }
    }
  }
}
    ${HomeOrErrorFragmentDoc}`;

/**
 * __useHomeQuery__
 *
 * To run a query within a React component, call `useHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHomeQuery(baseOptions: Apollo.QueryHookOptions<HomeQuery, HomeQueryVariables> & ({ variables: HomeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
      }
export function useHomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeQuery, HomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
        }
export function useHomeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HomeQuery, HomeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
        }
export type HomeQueryHookResult = ReturnType<typeof useHomeQuery>;
export type HomeLazyQueryHookResult = ReturnType<typeof useHomeLazyQuery>;
export type HomeSuspenseQueryHookResult = ReturnType<typeof useHomeSuspenseQuery>;
export type HomeQueryResult = Apollo.QueryResult<HomeQuery, HomeQueryVariables>;
export const NewHomeDocument = gql`
    mutation NewHome($id: ID!, $name: String!) {
  newHome(id: $id, name: $name) {
    __typename
    ... on Home {
      id
      name
    }
    ... on IError {
      message
    }
  }
}
    `;
export type NewHomeMutationFn = Apollo.MutationFunction<NewHomeMutation, NewHomeMutationVariables>;

/**
 * __useNewHomeMutation__
 *
 * To run a mutation, you first call `useNewHomeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewHomeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newHomeMutation, { data, loading, error }] = useNewHomeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewHomeMutation(baseOptions?: Apollo.MutationHookOptions<NewHomeMutation, NewHomeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewHomeMutation, NewHomeMutationVariables>(NewHomeDocument, options);
      }
export type NewHomeMutationHookResult = ReturnType<typeof useNewHomeMutation>;
export type NewHomeMutationResult = Apollo.MutationResult<NewHomeMutation>;
export type NewHomeMutationOptions = Apollo.BaseMutationOptions<NewHomeMutation, NewHomeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    __typename
    ... on Verified {
      tokens {
        access
        refresh
      }
    }
    ... on IError {
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshSessionDocument = gql`
    mutation RefreshSession($token: String!) {
  refresh(token: $token) {
    __typename
    ... on Verified {
      tokens {
        access
        refresh
      }
    }
    ... on IError {
      message
    }
  }
}
    `;
export type RefreshSessionMutationFn = Apollo.MutationFunction<RefreshSessionMutation, RefreshSessionMutationVariables>;

/**
 * __useRefreshSessionMutation__
 *
 * To run a mutation, you first call `useRefreshSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshSessionMutation, { data, loading, error }] = useRefreshSessionMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshSessionMutation(baseOptions?: Apollo.MutationHookOptions<RefreshSessionMutation, RefreshSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshSessionMutation, RefreshSessionMutationVariables>(RefreshSessionDocument, options);
      }
export type RefreshSessionMutationHookResult = ReturnType<typeof useRefreshSessionMutation>;
export type RefreshSessionMutationResult = Apollo.MutationResult<RefreshSessionMutation>;
export type RefreshSessionMutationOptions = Apollo.BaseMutationOptions<RefreshSessionMutation, RefreshSessionMutationVariables>;
export const HomePageDocument = gql`
    query HomePage($id: ID!) {
  viewer {
    id
    homes {
      byId(id: $id) {
        ...HomeOrError
      }
    }
  }
}
    ${HomeOrErrorFragmentDoc}`;

/**
 * __useHomePageQuery__
 *
 * To run a query within a React component, call `useHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHomePageQuery(baseOptions: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables> & ({ variables: HomePageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
      }
export function useHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
        }
export function useHomePageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
        }
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<typeof useHomePageLazyQuery>;
export type HomePageSuspenseQueryHookResult = ReturnType<typeof useHomePageSuspenseQuery>;
export type HomePageQueryResult = Apollo.QueryResult<HomePageQuery, HomePageQueryVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    __typename
    ... on Verified {
      tokens {
        access
        refresh
      }
    }
    ... on IError {
      message
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const InventoryDocument = gql`
    query Inventory($home: ID!) {
  viewer {
    id
    homes {
      byId(id: $home) {
        __typename
        ... on IError {
          message
        }
        ... on Home {
          id
          inventory {
            ...InventoryOrError
          }
        }
      }
    }
  }
}
    ${InventoryOrErrorFragmentDoc}`;

/**
 * __useInventoryQuery__
 *
 * To run a query within a React component, call `useInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInventoryQuery({
 *   variables: {
 *      home: // value for 'home'
 *   },
 * });
 */
export function useInventoryQuery(baseOptions: Apollo.QueryHookOptions<InventoryQuery, InventoryQueryVariables> & ({ variables: InventoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InventoryQuery, InventoryQueryVariables>(InventoryDocument, options);
      }
export function useInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InventoryQuery, InventoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InventoryQuery, InventoryQueryVariables>(InventoryDocument, options);
        }
export function useInventorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InventoryQuery, InventoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InventoryQuery, InventoryQueryVariables>(InventoryDocument, options);
        }
export type InventoryQueryHookResult = ReturnType<typeof useInventoryQuery>;
export type InventoryLazyQueryHookResult = ReturnType<typeof useInventoryLazyQuery>;
export type InventorySuspenseQueryHookResult = ReturnType<typeof useInventorySuspenseQuery>;
export type InventoryQueryResult = Apollo.QueryResult<InventoryQuery, InventoryQueryVariables>;
export const NewStockDocument = gql`
    mutation NewStock($id: ID!, $store: ID!, $name: String!, $expiry: Date, $quantity: Int) {
  newStockByNameOnly(
    id: $id
    name: $name
    store: $store
    expiry: $expiry
    quantity: $quantity
  ) {
    __typename
    ... on Stock {
      ...Stock
    }
    ... on IError {
      message
    }
  }
}
    ${StockFragmentDoc}`;
export type NewStockMutationFn = Apollo.MutationFunction<NewStockMutation, NewStockMutationVariables>;

/**
 * __useNewStockMutation__
 *
 * To run a mutation, you first call `useNewStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newStockMutation, { data, loading, error }] = useNewStockMutation({
 *   variables: {
 *      id: // value for 'id'
 *      store: // value for 'store'
 *      name: // value for 'name'
 *      expiry: // value for 'expiry'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useNewStockMutation(baseOptions?: Apollo.MutationHookOptions<NewStockMutation, NewStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewStockMutation, NewStockMutationVariables>(NewStockDocument, options);
      }
export type NewStockMutationHookResult = ReturnType<typeof useNewStockMutation>;
export type NewStockMutationResult = Apollo.MutationResult<NewStockMutation>;
export type NewStockMutationOptions = Apollo.BaseMutationOptions<NewStockMutation, NewStockMutationVariables>;
export const StoresDocument = gql`
    query Stores($home: ID!) {
  viewer {
    id
    homes {
      byId(id: $home) {
        __typename
        ... on IError {
          message
        }
        ... on Home {
          id
          stores {
            __typename
            ... on IError {
              message
            }
            ... on Stores {
              edges {
                cursor
                node {
                  ...Store
                }
              }
            }
          }
        }
      }
    }
  }
}
    ${StoreFragmentDoc}`;

/**
 * __useStoresQuery__
 *
 * To run a query within a React component, call `useStoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoresQuery({
 *   variables: {
 *      home: // value for 'home'
 *   },
 * });
 */
export function useStoresQuery(baseOptions: Apollo.QueryHookOptions<StoresQuery, StoresQueryVariables> & ({ variables: StoresQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoresQuery, StoresQueryVariables>(StoresDocument, options);
      }
export function useStoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoresQuery, StoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoresQuery, StoresQueryVariables>(StoresDocument, options);
        }
export function useStoresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StoresQuery, StoresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StoresQuery, StoresQueryVariables>(StoresDocument, options);
        }
export type StoresQueryHookResult = ReturnType<typeof useStoresQuery>;
export type StoresLazyQueryHookResult = ReturnType<typeof useStoresLazyQuery>;
export type StoresSuspenseQueryHookResult = ReturnType<typeof useStoresSuspenseQuery>;
export type StoresQueryResult = Apollo.QueryResult<StoresQuery, StoresQueryVariables>;
export const NewStoreDocument = gql`
    mutation NewStore($id: ID!, $home: ID!, $name: String!) {
  newStore(id: $id, home: $home, name: $name) {
    __typename
    ... on Store {
      ...Store
    }
    ... on IError {
      message
    }
  }
}
    ${StoreFragmentDoc}`;
export type NewStoreMutationFn = Apollo.MutationFunction<NewStoreMutation, NewStoreMutationVariables>;

/**
 * __useNewStoreMutation__
 *
 * To run a mutation, you first call `useNewStoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewStoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newStoreMutation, { data, loading, error }] = useNewStoreMutation({
 *   variables: {
 *      id: // value for 'id'
 *      home: // value for 'home'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewStoreMutation(baseOptions?: Apollo.MutationHookOptions<NewStoreMutation, NewStoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewStoreMutation, NewStoreMutationVariables>(NewStoreDocument, options);
      }
export type NewStoreMutationHookResult = ReturnType<typeof useNewStoreMutation>;
export type NewStoreMutationResult = Apollo.MutationResult<NewStoreMutation>;
export type NewStoreMutationOptions = Apollo.BaseMutationOptions<NewStoreMutation, NewStoreMutationVariables>;
export const ViewerDocument = gql`
    query Viewer {
  viewer {
    id
    email
    createdOn
  }
}
    `;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
      }
export function useViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
        }
export function useViewerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerSuspenseQueryHookResult = ReturnType<typeof useViewerSuspenseQuery>;
export type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;