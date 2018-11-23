import { Store } from 'redux';
import createMockStore from 'redux-mock-store';

import { createAppState, IAppState } from '../src/state';

export const createStoreContext = (
    state: IAppState = createAppState(),
): { store: Store<IAppState> } => ({
    store: createMockStore<IAppState>()(state),
});
