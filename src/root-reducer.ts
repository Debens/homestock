import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import application from './application';
import authentication from './authentication';
import container from './container';
import { IAppState } from './state';
import stock from './stock';
import user from './user';

export const rootReducer = combineReducers<IAppState>({
    form: formReducer,
    application: application.reducer,
    user: user.reducer,
    container: container.reducer,
    stock: stock.reducer,
    authentication: authentication.reducer,
});

export default rootReducer;
