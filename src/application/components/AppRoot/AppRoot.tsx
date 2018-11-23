import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import history from '../../../history';
import store from '../../../store';
import { App } from '../App/App';

const DEFAULT_LOCALE = 'en';

export const AppRoot: React.SFC = () => (
    <IntlProvider locale={DEFAULT_LOCALE} defaultLocale={DEFAULT_LOCALE}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    </IntlProvider>
);

export default AppRoot;
