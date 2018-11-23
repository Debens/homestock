import { createSelector, Selector } from 'reselect';

import { IAppState, IUser } from '../state';

export const user: Selector<IAppState, IUser> = state => state.user.details;

export const id: Selector<IAppState, string> = createSelector<IAppState, IUser, string>(
    user,
    user => user.id,
);

export const email: Selector<IAppState, string> = createSelector<
    IAppState,
    IUser,
    string
>(user, user => user.email);

export const error: Selector<IAppState, string> = state => state.user.error;

export const isLoading: Selector<IAppState, boolean> = state => state.user.loading;

export const isError: Selector<IAppState, boolean> = createSelector<
    IAppState,
    string,
    boolean
>(error, message => !!message);
