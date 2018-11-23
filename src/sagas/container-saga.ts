import { List } from 'immutable';
import { Action } from 'redux-actions';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import container from '../container/index';
import containerService from '../container/service';
import errorService from '../services/error/error-service';
import { IContainer } from '../state';
import stock from '../stock/index';

export function* watchContainerSaga(): SagaIterator {
    yield all([takeLatest(container.actions.FETCH_ALL, fetchContainersSaga)]);
}

export function* fetchContainersSaga(): SagaIterator {
    try {
        yield put(container.actions.loading(true));
        const containers: List<IContainer> = yield call(containerService.getAll);

        yield put(container.actions.set(containers));

        yield all(
            containers.map(container => put(stock.actions.fetch(container.id))).toArray(),
        );
    } catch (error) {
        console.error(error);

        const message: string = yield call(errorService.getMessage, error);

        yield put(container.actions.error(message));
    } finally {
        yield put(container.actions.loading(false));
    }
}
