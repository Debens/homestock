import { List } from 'immutable';

import { INITIAL_STATE } from '../state';
import * as actions from './actions';
import { ISnackbarState } from './model';
import * as reducers from './reducers';

describe('Application reducers', () => {
    describe('snackbars reducer', () => {
        describe('when action is not matched', () => {
            describe('when has a current state', () => {
                it('should return the previous state', () => {
                    const state = List<ISnackbarState>();
                    expect(reducers.snackbars(state, { type: 'zachary efron' })).toEqual(
                        state,
                    );
                });
            });

            describe('when has no current state', () => {
                it('should default to initial state', () => {
                    expect(
                        reducers.snackbars(undefined, { type: 'zachary efron' }),
                    ).toEqual(INITIAL_STATE.application.snackbars);
                });
            });
        });

        describe('when a show snackbar action has been fired', () => {
            it('then should update the state with the occurring error', () => {
                const state = List<ISnackbarState>();
                const payload: ISnackbarState = {
                    id: 'zac efron',
                    text: 'zachary efron',
                };

                const nextState = reducers.snackbars(state, {
                    type: actions.SHOW_SNACKBAR,
                    payload,
                });

                expect(nextState.toArray()).toEqual([payload]);
            });
        });

        describe('when hiding a snack bar', () => {
            it('then should remove the snackbar by id', () => {
                const remainingSnackbar = {
                    id: 'zachary',
                    text: 'david',
                };
                const state = List<ISnackbarState>([
                    remainingSnackbar,
                    {
                        id: 'alexander',
                        text: 'efron',
                    },
                ]);

                const nextState = reducers.snackbars(state, {
                    type: actions.HIDE_SNACKBAR,
                    payload: 'alexander',
                });

                expect(nextState.toArray()).toEqual([remainingSnackbar]);
            });
        });
    });
});
