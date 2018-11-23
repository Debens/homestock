import { List } from 'immutable';
import { Selector } from 'reselect';

import { IAppState } from '../state';
import { ISnackbarState } from './model';

export const snackbars: Selector<IAppState, List<ISnackbarState>> = state =>
    state.application.snackbars;
