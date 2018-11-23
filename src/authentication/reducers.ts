import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { IAuthenticationState, INITIAL_STATE } from '../state';
import * as actions from './actions';
import * as selectors from './selectors';

export const error = handleActions<string>(
    {
        [actions.ERROR]: (state, { payload }) => payload,
        [actions.LOGIN]: state => selectors.error(INITIAL_STATE),
    },
    selectors.error(INITIAL_STATE),
);

export const loading = handleActions<boolean>(
    {
        [actions.LOADING]: (state, { payload }) => payload,
    },
    selectors.isLoading(INITIAL_STATE),
);

export default combineReducers<IAuthenticationState>({
    error,
    loading,
});
