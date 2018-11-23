import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { IAppState } from '../../../state';
import LoginForm, { ILoginFormData, ILoginFormDispatchProps, ILoginFormStateProps } from '../../components/LoginForm/LoginForm';
import authentication from '../../index';

const mapStateToProps: MapStateToProps<ILoginFormStateProps, {}, IAppState> = state => ({
    error: authentication.selectors.error(state),
    isLoading: authentication.selectors.isLoading(state),
});

const mapDispatchToProps: MapDispatchToProps<ILoginFormDispatchProps, {}> = dispatch => ({
    onLogin: (credentials: ILoginFormData) =>
        dispatch(authentication.actions.login(credentials)),
});

export default connect<ILoginFormStateProps, ILoginFormDispatchProps, {}, IAppState>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginForm);
