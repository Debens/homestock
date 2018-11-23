import { createAppState } from '../state';
import * as selectors from './selectors';

describe('Authentication selectors', () => {
    const loading = false;
    const error = 'zachary efron';

    const state = createAppState({
        authentication: {
            loading,
            error,
        },
    });

    describe('isLoading', () => {
        it('should select the loading value', () => {
            expect(selectors.isLoading(state)).toBe(loading);
        });
    });

    describe('error', () => {
        it('should select the loading value', () => {
            expect(selectors.error(state)).toBe(error);
        });
    });
});
