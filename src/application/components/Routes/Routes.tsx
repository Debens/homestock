import * as React from 'react';
import { Route, Switch } from 'react-router';

import HomePage from '../../../pages/HomePage/HomePage';
import { LoginPage } from '../../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../../pages/RegistrationPage/RegistrationPage';

export const Routes: React.SFC = () => (
    <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/registration" exact component={RegistrationPage} />
    </Switch>
);

export default Routes;
