import { combineReducers, Reducer } from 'redux';

// In order to make the combineReducers composable we will wrap combineReducers to re-assign any discarded state keys
export const composableCombineReducers = <S>(reducers: any): Reducer<S> => (
    state: any,
    action: any,
): any => Object.assign({}, state, combineReducers(reducers)(state, action));

export const reduceReducers = <S>(...reducers: Array<Reducer<S>>): Reducer<S> => (
    state: any,
    action: any,
): any => reducers.reduce((s: any, r: Reducer<any>): Reducer<S> => r(s, action), state);

export const identityReducer = <T>(initialState?: T): Reducer<T> => (x: T) =>
    x || initialState;
