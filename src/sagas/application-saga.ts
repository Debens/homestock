import { push as route } from 'react-router-redux';
import { Action } from 'redux-actions';
import { delay, SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import application from '../application/index';
import { ISnackbarState } from '../application/model';
import authentication from '../authentication/index';
import render from '../renderer';

const SNACKBAR_TIMEOUT = 10000;

export function* watchApplicationStartSaga(): SagaIterator {
    yield all([
        takeLatest(application.actions.INIT, startApplicationSaga),
        takeEvery(application.actions.SHOW_SNACKBAR, snackbarSaga),
    ]);
}

export function* startApplicationSaga(): SagaIterator {
    const isLoggedIn: boolean = yield call(authentication.service.isLoggedIn);
    if (!isLoggedIn) {
        yield put(route('/login'));
    }

    yield call(render);
}

export function* snackbarSaga({ payload }: Action<ISnackbarState>): SagaIterator {
    yield call(delay, SNACKBAR_TIMEOUT);

    yield put(application.actions.hideSnackbar(payload.id));
}
