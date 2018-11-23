import { List } from 'immutable';
import { createAction } from 'redux-actions';

import { IStock } from '../state';
import prefix from '../utils/prefix';

const namespaced = prefix('stock');

export interface IStockPayload {
    for: string;
    data: List<IStock>;
}

export const LOADING = namespaced('loading');
export const loading = createAction<boolean>(LOADING);

export const FETCH = namespaced('fetch');
export const fetch = createAction(FETCH);

export const SET = namespaced('set');
export const set = createAction<IStockPayload>(SET);

export const SELECT = namespaced('select');
export const select = createAction<string>(SELECT);

export const ERROR = namespaced('error');
export const error = createAction(ERROR);
