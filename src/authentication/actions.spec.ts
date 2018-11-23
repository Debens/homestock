import { actionCreatorSpec } from '../../test/redux-actions';
import * as actions from './actions';
import { ICredentials } from './service';

describe('Authentication Actions', () => {
    actionCreatorSpec<ICredentials>({
        name: 'authentication/login',
        type: actions.LOGIN,
        creator: actions.login,
        params: {
            username: 'zachary',
            password: 'efron',
        },
        payload: {
            username: 'zachary',
            password: 'efron',
        },
    });

    actionCreatorSpec({
        name: 'authentication/logout',
        type: actions.LOGOUT,
        creator: actions.logout,
    });

    actionCreatorSpec<string>({
        name: 'authentication/error',
        type: actions.ERROR,
        creator: actions.error,
        params: 'zac efron',
        payload: 'zac efron',
    });

    actionCreatorSpec<boolean>({
        name: 'authentication/loading',
        type: actions.LOADING,
        creator: actions.loading,
        params: true,
        payload: true,
    });
});
