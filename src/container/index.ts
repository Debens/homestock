import * as actions from './actions';
import reducer from './reducers';
import * as selectors from './selectors';
import service from './service';

export const container = { actions, selectors, reducer, service };

export default container;
