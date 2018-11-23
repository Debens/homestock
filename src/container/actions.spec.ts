import { List } from 'immutable';

import { actionCreatorSpec } from '../../test/redux-actions';
import * as actions from './actions';

describe('Container Actions', () => {
    actionCreatorSpec({
        name: 'container/loading',
        type: actions.LOADING,
        creator: actions.loading,
        params: true,
        payload: true,
    });

    actionCreatorSpec({
        name: 'container/fetch',
        type: actions.FETCH,
        creator: actions.fetch,
        params: 'zac efron',
        payload: 'zac efron',
    });

    actionCreatorSpec({
        name: 'container/fetch-all',
        type: actions.FETCH_ALL,
        creator: actions.fetchAll,
    });

    actionCreatorSpec({
        name: 'container/select',
        type: actions.SELECT,
        creator: actions.select,
        params: 'zac efron',
        payload: 'zac efron',
    });

    actionCreatorSpec({
        name: 'container/error',
        type: actions.ERROR,
        creator: actions.error,
        params: 'zac efron',
        payload: 'zac efron',
    });

    actionCreatorSpec({
        name: 'container/set',
        type: actions.SET,
        creator: actions.set,
        params: List(),
        payload: List(),
    });

    actionCreatorSpec({
        name: 'container/search',
        type: actions.SEARCH,
        creator: actions.search,
        params: 'zac efron',
        payload: 'zac efron',
    });
});
