import { SagaIterator } from 'redux-saga';
import { all, fork, put } from 'redux-saga/effects';

import application from '../application/index';
import { watchApplicationStartSaga } from './application-saga';
import { watchAuthenticationSaga } from './authentication-saga';
import { watchContainerSaga } from './container-saga';
import { watchStockSaga } from './stock-saga';
import { watchUserSaga } from './user-saga';

export function* rootSaga(): SagaIterator {
    yield all(
        [
            watchApplicationStartSaga,
            watchAuthenticationSaga,
            watchUserSaga,
            watchContainerSaga,
            watchStockSaga,
        ].map(fork),
    );

    yield put(application.actions.init());
}
