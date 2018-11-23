import { List } from 'immutable';

import { createAppState, IContainer } from '../state';
import * as selectors from './selectors';

describe('Application selectors', () => {
    const data = List<IContainer>([
        {
            id: 'zac',
        },
    ]);
    const loading = false;
    const error = 'zac efron';
    const active = 'zac';
    const search = 'efron';

    const state = createAppState({
        container: {
            data,
            loading,
            error,
            active,
            search,
        },
    });

    describe('all', () => {
        it('should select the containers', () => {
            expect(selectors.all(state)).toBe(data);
        });
    });

    describe('error', () => {
        it('should select the error state', () => {
            expect(selectors.error(state)).toBe(error);
        });
    });

    describe('isLoading', () => {
        it('should select the loading state', () => {
            expect(selectors.isLoading(state)).toBe(loading);
        });
    });

    describe('active', () => {
        it('should select the active container id', () => {
            expect(selectors.active(state)).toBe(active);
        });
    });

    describe('selected', () => {
        it('should select the active container', () => {
            expect(selectors.selected(state)).toBe(data.get(0));
        });
    });

    describe('search', () => {
        it('should select the filter text', () => {
            expect(selectors.search(state)).toBe(search);
        });
    });
});
