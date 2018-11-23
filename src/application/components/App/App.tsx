import * as React from 'react';
import { Router } from 'react-router';

import GutteredView from '../../../components/layout/GutteredView/GutteredView';
import history from '../../../history';
import SnackbarArrayContainer from '../../containers/SnackbarArrayContainer';
import { Routes } from '../Routes/Routes';
import styles from './styles.scss';

export const App: React.SFC = () => (
    <>
        <Router history={history}>
            <Routes />
        </Router>
        <div className={styles.snackbarContainer}>
            <GutteredView>
                <SnackbarArrayContainer />
            </GutteredView>
        </div>
    </>
);

export default App;
