import * as React from 'react';

import CenteredPage from '../../components/layout/CenteredPage/CenteredPage';
import CreateUserFormContainer from '../../user/container/CreateUserForm/CreateUserFormContainer';

export const RegistrationPage = () => (
    <CenteredPage>
        <CreateUserFormContainer />
    </CenteredPage>
);

export default RegistrationPage;
