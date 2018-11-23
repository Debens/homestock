import { routerMiddleware } from 'react-router-redux';
import { AnyAction, applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { Action } from 'redux-actions';
import { createLogger } from 'redux-logger';
import { PersistConfig, PersistPartial, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';

import history from './history';
import rootReducer from './root-reducer';
import sagaExecutor from './sagas/index';
import { IAppState, INITIAL_STATE } from './state';

const composeReduxDevtools = <S>(...enhancers: StoreEnhancer<S>[]): StoreEnhancer<S> =>
    compose(
        ...enhancers,
        !!(window as any).__REDUX_DEVTOOLS_EXTENSION__
            ? __REDUX_DEVTOOLS_EXTENSION__()
            : (arg: any) => arg,
    );

const middlewares = [sagaExecutor, routerMiddleware(history)];

if (process.env.NODE_ENV === `development`) {
    middlewares.push(createLogger());
}

const persistedReducer = persistReducer<IAppState, AnyAction>(
    {
        transforms: [immutableTransform()],
        key: 'root',
        storage,
    },
    rootReducer,
);

export const store = createStore<IAppState & PersistPartial, Action<any>, {}, {}>(
    persistedReducer,
    INITIAL_STATE,
    composeReduxDevtools(applyMiddleware(...middlewares)),
);

export default store;
