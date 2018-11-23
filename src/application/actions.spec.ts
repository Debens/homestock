import { actionCreatorSpec } from '../../test/redux-actions';
import * as actions from './actions';
import { ISnackbarState } from './model';

describe('Application Actions', () => {
    actionCreatorSpec({
        name: 'application/init',
        type: actions.INIT,
        creator: actions.init,
    });

    const snackbarPayload: ISnackbarState = {
        id: 'zac efron',
        text: 'zachary david',
        actionText: 'alexander efron',
        action: actions.init(),
    };

    actionCreatorSpec({
        name: 'application/show-snackbar',
        type: actions.SHOW_SNACKBAR,
        creator: actions.showSnackbar,
        params: snackbarPayload,
        payload: snackbarPayload,
    });

    actionCreatorSpec({
        name: 'application/hide-snackbar',
        type: actions.HIDE_SNACKBAR,
        creator: actions.hideSnackbar,
        params: 'zac efron',
        payload: 'zac efron',
    });
});
