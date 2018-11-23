import { List } from 'immutable';
import { createAction } from 'redux-actions';

import { IContainer } from '../state';
import prefix from '../utils/prefix';

const namespaced = prefix('container');

export const LOADING = namespaced('loading');
export const loading = createAction<boolean>(LOADING);

export const FETCH = namespaced('fetch');
export const fetch = createAction<string>(FETCH);

export const FETCH_ALL = namespaced('fetch-all');
export const fetchAll = createAction(FETCH_ALL);

export const SET = namespaced('set');
export const set = createAction<List<IContainer>>(SET);

export const SELECT = namespaced('select');
export const select = createAction<string>(SELECT);

export const ERROR = namespaced('error');
export const error = createAction(ERROR);

export const SEARCH = namespaced('search');
export const search = createAction<string>(SEARCH);
