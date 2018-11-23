import { Selector } from 'reselect';

import { IAppState } from '../state';

export const error: Selector<IAppState, string> = state => state.authentication.error;

export const isLoading: Selector<IAppState, boolean> = state =>
    state.authentication.loading;
