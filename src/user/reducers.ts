import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import authentication from '../authentication/index';
import { ICredentials } from '../authentication/service';
import { INITIAL_STATE, IUser } from '../state';
import { reduceReducers } from '../utils/reducers';
import * as actions from './actions';
import * as selectors from './selectors';

export const details = handleActions<IUser, Partial<IUser>>(
    {
        [actions.SET]: (state, { payload }) => ({ ...state, ...payload }),
        [actions.UPDATE]: (state, { payload }) => ({ ...state, ...payload }),
    },
    selectors.user(INITIAL_STATE),
);

export const login = handleActions<IUser, ICredentials>(
    {
        [authentication.actions.LOGIN]: (state, { payload }) => ({
            ...state,
            username: payload.username,
        }),
    },
    selectors.user(INITIAL_STATE),
);

export const loading = handleActions<boolean>(
    {
        [actions.FETCH]: state => true,
        [actions.SET]: state => false,
        [actions.ERROR]: state => false,
    },
    selectors.isLoading(INITIAL_STATE),
);

export const error = handleActions<string, string>(
    {
        [actions.CREATE]: state => '',
        [actions.SET]: state => '',
        [actions.CLEAN_ERROR]: state => '',
        [actions.ERROR]: (state, { payload }) => payload,
    },
    selectors.error(INITIAL_STATE),
);

export default combineReducers({
    loading,
    error,
    details: reduceReducers(details, login),
});
