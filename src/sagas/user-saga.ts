import { push as route } from 'react-router-redux';
import { Action } from 'redux-actions';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import application from '../application/index';
import authentication from '../authentication/index';
import { SnackbarStyle } from '../components/Snackbar/Snackbar';
import { errorService } from '../services/error/error-service';
import { IUser } from '../state';
import user from '../user/index';
import service, { ICreateUserParams } from '../user/service';

const DEFAULT_CREATE_ERROR = 'Failed to create new user';

export function* watchUserSaga(): SagaIterator {
    yield all([
        takeEvery(user.actions.CREATE, createUserSaga),
        takeEvery(user.actions.FETCH, fetchUserSaga),
    ]);
}

export function* createUserSaga(action: Action<ICreateUserParams>): SagaIterator {
    yield put(authentication.actions.loading(true));
    const user = action.payload;

    try {
        yield call(service.create, user);

        yield put(
            authentication.actions.login({
                username: user.email,
                password: user.password,
            }),
        );

        yield put(route('/'));
    } catch (error) {
        const errorMessage: string = yield call(errorService.getMessage, error, {
            default: DEFAULT_CREATE_ERROR,
        });

        console.error(error);

        yield put(
            application.actions.showSnackbar({
                id: 'create-user',
                text: errorMessage,
                style: SnackbarStyle.Error,
            }),
        );
    } finally {
        yield put(authentication.actions.loading(false));
    }
}

export function* fetchUserSaga(): SagaIterator {
    try {
        const result: IUser = yield call(service.get);

        yield put(user.actions.set(result));
    } catch (error) {
        // TODO: Global error w/ redirect to error page?
        const errorMessage: string = yield call(errorService.getMessage, error);

        yield put(user.actions.error(errorMessage));
    }
}
