import { List } from 'immutable';

import { createAppState } from '../state';
import { ISnackbarState } from './model';
import * as selectors from './selectors';

describe('Application selectors', () => {
    const snackbars = List<ISnackbarState>();
    const state = createAppState({
        application: {
            snackbars,
        },
    });

    describe('snackbars', () => {
        it('should select the snackbars', () => {
            expect(selectors.snackbars(state)).toBe(snackbars);
        });
    });
});
