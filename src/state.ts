import merge from 'deepmerge';
import { List, Map } from 'immutable';
import isPlainObject from 'is-plain-object';
import { FormStateMap } from 'redux-form';

import { ISnackbarState } from './application/model';

export interface ILoadable {
    loading: boolean;
    error: string;
}

export interface IAppState {
    form: FormStateMap;
    application: IApplicationState;
    authentication: IAuthenticationState;
    user: IUserState;
    container: IContainerState;
    stock: IStockState;
}

export interface IApplicationState {
    snackbars: List<ISnackbarState>;
}

export interface IAuthenticationState extends ILoadable {}

export interface IUserState extends ILoadable {
    details: IUser;
}

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    created: string;
    birthday: Date;
}

export interface IContainerState extends ILoadable {
    data: List<IContainer>;
    active: string;
    search: string;
}

export interface IContainer {
    id: string;
    name: string;
    created: Date;
    memberships: IContainerMembership[];
}

export interface IContainerMembership {
    id: string;
    create: Date;
    access: ContainerAccessLevel;
    pending: boolean;
    user: IUser;
}

export enum ContainerAccessLevel {
    Read = 'Read',
    Write = 'Write',
    Admin = 'Admin',
    Owner = 'Owner',
}

export interface IStockState extends ILoadable {
    data: Map<string, List<IStock>>;
    active: string;
}

export interface IStock {
    id: string;
    created: string;
    quantity: string;
    expiry?: string;
    product: IProduct;
}

export interface IProduct {
    id: string;
    name: string;
    created: string;
}

export const createAppState = (overrides: DeepPartial<IAppState> = {}) =>
    merge<IAppState, DeepPartial<IAppState>>(
        {
            form: {},
            application: {
                snackbars: List(),
            },
            authentication: {
                loading: false,
                error: '',
            },
            user: {
                details: {
                    id: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    created: '',
                    birthday: null,
                },
                loading: false,
                error: '',
            },
            container: {
                data: List(),
                active: '',
                loading: false,
                error: '',
                search: '',
            },
            stock: {
                data: Map(),
                active: '',
                loading: false,
                error: '',
            },
        },
        overrides,
        {
            isMergeableObject: (value: any) =>
                isPlainObject(value) && !List.isList(value),
        },
    );

export const INITIAL_STATE = createAppState();

export default INITIAL_STATE;
