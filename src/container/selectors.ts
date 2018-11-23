import { List } from 'immutable';
import { createSelector, Selector } from 'reselect';

import { IAppState, IContainer } from '../state';

export const all: Selector<IAppState, List<IContainer>> = state => state.container.data;

export const container = (state: IAppState, id: string): IContainer =>
    createSelector(all, containers => containers.find(container => container.id === id))(
        state,
    );

export const active: Selector<IAppState, string> = state => state.container.active;

export const selected: Selector<IAppState, IContainer> = createSelector(
    all,
    active,
    (containers, id) => containers.find(container => container.id === id),
);

export const isLoading: Selector<IAppState, boolean> = state => state.container.loading;

export const error: Selector<IAppState, string> = state => state.container.error;

export const search: Selector<IAppState, string> = state => state.container.search;
