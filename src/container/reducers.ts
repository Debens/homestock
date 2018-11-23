import { List } from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import INITIAL_STATE, { IContainer } from '../state';
import * as actions from './actions';
import * as selectors from './selectors';

export const loading = handleActions<boolean>(
    {
        [actions.LOADING]: (state, { payload }) => payload,
    },
    selectors.isLoading(INITIAL_STATE),
);

export const error = handleActions<string, string | void>(
    {
        [actions.ERROR]: state => state,
        [actions.LOADING]: (state, { payload }) => (payload ? '' : state),
    },
    selectors.error(INITIAL_STATE),
);

export const active = handleActions<string>(
    {
        [actions.SELECT]: (state, { payload }) => payload,
    },
    selectors.active(INITIAL_STATE),
);

export const data = handleActions<List<IContainer>>(
    {
        [actions.SET]: (state, { payload }) => payload,
    },
    selectors.all(INITIAL_STATE),
);

export const search = handleActions<string>(
    {
        [actions.SEARCH]: (state, { payload }) => payload,
    },
    selectors.search(INITIAL_STATE),
);

export default combineReducers({
    loading,
    error,
    data,
    active,
    search,
});
