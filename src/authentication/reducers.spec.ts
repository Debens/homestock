import { INITIAL_STATE } from '../state';
import * as actions from './actions';
import * as reducers from './reducers';

describe('Authentication reducers', () => {
    describe('error reducer', () => {
        describe('when action is not matched', () => {
            describe('when has a current state', () => {
                it('should return the previous state', () => {
                    const state = 'zachary efron';
                    expect(reducers.error(state, { type: 'zachary efron' })).toEqual(
                        state,
                    );
                });
            });

            describe('when has no current state', () => {
                it('should default to initial state', () => {
                    expect(reducers.error(undefined, { type: 'zachary efron' })).toEqual(
                        INITIAL_STATE.authentication.error,
                    );
                });
            });
        });

        describe('when an error has occurring', () => {
            it('then should update the state with the occurring error', () => {
                const state = 'efron';
                const payload = 'zac';

                const nextState = reducers.error(state, {
                    type: actions.ERROR,
                    payload,
                });

                expect(nextState).toBe(payload);
                expect(state).not.toBe(payload);
            });
        });

        describe('when attempting a new login', () => {
            it('then should clear an errors', () => {
                const state = 'efron';

                const nextState = reducers.error(state, {
                    type: actions.LOGIN,
                });

                expect(nextState).toBe(INITIAL_STATE.authentication.error);
            });
        });
    });

    describe('loading reducer', () => {
        describe('when action is not matched', () => {
            describe('when has a current state', () => {
                it('should return the previous state', () => {
                    const state = false;
                    expect(reducers.loading(state, { type: 'zachary efron' })).toEqual(
                        state,
                    );
                });
            });

            describe('when has no current state', () => {
                it('should default to initial state', () => {
                    expect(
                        reducers.loading(undefined, { type: 'zachary efron' }),
                    ).toEqual(INITIAL_STATE.authentication.loading);
                });
            });
        });

        describe('when an error has occurring', () => {
            it('then should update the state with the occurring error', () => {
                const state = false;
                const payload = true;

                const nextState = reducers.loading(state, {
                    type: actions.LOADING,
                    payload,
                });

                expect(nextState).toBe(payload);
                expect(state).not.toBe(payload);
            });
        });
    });
});
