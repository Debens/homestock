import { List } from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { INITIAL_STATE } from '../state';
import * as actions from './actions';
import { ISnackbarState } from './model';
import * as selectors from './selectors';

export const snackbars = handleActions<List<ISnackbarState>, ISnackbarState | string>(
    {
        [actions.SHOW_SNACKBAR]: (state, { payload }) => {
            const config = payload as ISnackbarState;
            if (state.find(snackbar => snackbar.id === config.id)) {
                return state;
            }

            return state.push(config);
        },
        [actions.HIDE_SNACKBAR]: (state, { payload }) =>
            state.filter(snackbar => snackbar.id !== payload).toList(),
    },
    selectors.snackbars(INITIAL_STATE),
);

export default combineReducers({ snackbars });
