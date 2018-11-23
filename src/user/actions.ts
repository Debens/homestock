import { createAction } from 'redux-actions';

import { IUser } from '../state';
import prefix from '../utils/prefix';
import { ICreateUserParams } from './service';

const namespaced = prefix('user');

export const SET = namespaced('set');
export const set = createAction<IUser>(SET);

export const UPDATE = namespaced('update');
export const update = createAction<Partial<IUser>>(UPDATE);

export const FETCH = namespaced('fetch');
export const fetch = createAction(FETCH);

export const CREATE = namespaced('create');
export const create = createAction<ICreateUserParams>(CREATE);

export const ERROR = namespaced('error');
export const error = createAction<string>(ERROR);

export const CLEAN_ERROR = namespaced('clean');
export const cleanError = createAction(CLEAN_ERROR);
