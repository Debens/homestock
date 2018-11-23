import { createAction } from 'redux-actions';

import prefix from '../utils/prefix';
import { ISnackbarState } from './model';

const namespaced = prefix('application');

export const INIT = namespaced('init');
export const init = createAction(INIT);

export const SHOW_SNACKBAR = namespaced('show-snackbar');
export const showSnackbar = createAction<ISnackbarState>(SHOW_SNACKBAR);

export const HIDE_SNACKBAR = namespaced('hide-snackbar');
export const hideSnackbar = createAction<string>(HIDE_SNACKBAR);
