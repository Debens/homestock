import { push as route } from 'react-router-redux';
import { Action } from 'redux-actions';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import application from '../application/index';
import authentication from '../authentication/index';
import service, { ICredentials } from '../authentication/service';
import { SnackbarStyle } from '../components/Snackbar/Snackbar';
import container from '../container/index';
import { errorService } from '../services/error/error-service';
import user from '../user/index';

const DEFAULT_LOGIN_ERROR = 'Login failed';

export function* watchAuthenticationSaga(): SagaIterator {
    yield all([
        takeEvery(authentication.actions.LOGIN, loginSaga),
        takeEvery(authentication.actions.LOGOUT, logout),
    ]);
}

export function* loginSaga(action: Action<ICredentials>): SagaIterator {
    yield put(authentication.actions.loading(true));
    try {
        yield call(service.login, action.payload);

        yield all([put(user.actions.fetch()), put(container.actions.fetchAll())]);

        // TODO: get redirect URL?
        yield put(route('/'));
    } catch (error) {
        const errorMessage: string = yield call(errorService.getMessage, error, {
            default: DEFAULT_LOGIN_ERROR,
        });

        yield put(
            application.actions.showSnackbar({
                id: 'login',
                text: errorMessage,
                style: SnackbarStyle.Error,
                action,
                actionText: 'Retry',
            }),
        );
    } finally {
        yield put(authentication.actions.loading(false));
    }
}

export function* logout(): SagaIterator {
    const isLoggedIn: boolean = yield call(service.isLoggedIn);

    if (isLoggedIn) {
        const token: string = yield call(service.accessToken);

        yield call(service.logout, token);
    }

    yield put(route('/login'));
}
