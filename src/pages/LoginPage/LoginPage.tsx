import * as React from 'react';

import LoginFormContainer from '../../authentication/containers/LoginForm/LoginFormContainer';
import CenteredPage from '../../components/layout/CenteredPage/CenteredPage';

export const LoginPage: React.SFC = () => (
    <CenteredPage>
        <LoginFormContainer />
    </CenteredPage>
);

export default LoginPage;
