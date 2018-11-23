import { List, Map } from 'immutable';
import { createSelector, Selector } from 'reselect';

import { IAppState, IStock } from '../state';

export const data: Selector<IAppState, Map<string, List<IStock>>> = state =>
    state.stock.data;

export const createStockSelector = (
    container: string,
): Selector<IAppState, List<IStock>> => state =>
    state.stock.data.get(container) || List();

export const quantity = (state: IAppState, container: string) =>
    createSelector<IAppState, List<IStock>, number>(
        createStockSelector(container),
        stock => stock.size,
    )(state);

export const active: Selector<IAppState, string> = state => state.stock.active;

export const isLoading: Selector<IAppState, boolean> = state => state.stock.loading;

export const error: Selector<IAppState, string> = state => state.stock.error;
