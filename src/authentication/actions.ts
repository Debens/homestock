import { createAction } from 'redux-actions';

import prefix from '../utils/prefix';
import { ICredentials } from './service';

const namespaced = prefix('authentication');

export const LOGIN = namespaced('login');
export const login = createAction<ICredentials>(LOGIN);

export const LOGOUT = namespaced('logout');
export const logout = createAction(LOGOUT);

export const ERROR = namespaced('error');
export const error = createAction<string>(ERROR);

export const LOADING = namespaced('loading');
export const loading = createAction<boolean>(LOADING);
