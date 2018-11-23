import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { IAppState } from '../../../state';
import CreateUserForm, { ICreateUserFormData, ICreateUserFormDispatchProps, ICreateUserFormStateProps } from '../../components/CreateUserForm/CreateUserForm';
import user from '../../index';

const mapStateToProps: MapStateToProps<
    ICreateUserFormStateProps,
    {},
    IAppState
> = state => ({
    error: user.selectors.error(state),
    isLoading: user.selectors.isLoading(state),
});

const mapDispatchToProps: MapDispatchToProps<
    ICreateUserFormDispatchProps,
    {}
> = dispatch => ({
    onSubmit: (data: ICreateUserFormData) => dispatch(user.actions.create(data)),
});

export default connect<
    ICreateUserFormStateProps,
    ICreateUserFormDispatchProps,
    {},
    IAppState
>(mapStateToProps, mapDispatchToProps)(CreateUserForm);
