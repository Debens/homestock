import { List } from 'immutable';
import { Action } from 'redux-actions';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import container from '../container';
import { errorService } from '../services/error/error-service';
import { IStock } from '../state';
import stock from '../stock';

export function* watchStockSaga(): SagaIterator {
    yield all([
        takeEvery(stock.actions.FETCH, fetchStockSaga),
        takeLatest(container.actions.SELECT, fetchStockSaga),
    ]);
}

export function* fetchStockSaga({ payload: container }: Action<string>): SagaIterator {
    try {
        yield put(stock.actions.loading(true));

        const data: List<IStock> = yield call(stock.service.getAll, container);

        yield put(stock.actions.set({ for: container, data }));
    } catch (error) {
        console.error(error);

        const message: string = yield call(errorService.getMessage, error);

        yield put(stock.actions.error(message));
    } finally {
        yield put(stock.actions.loading(false));
    }
}
