import * as React from 'react';
import { reduxForm } from 'redux-form';
import { shouldAsyncValidate } from 'redux-form-yup';
import * as Yup from 'yup';

import { ComponentFormProps } from '../../../@types/redux-form';
import { Button } from '../../../components/Button/Button';
import GutteredView from '../../../components/layout/GutteredView/GutteredView';
import Link from '../../../components/Link/Link';
import PasswordInputFormField, { PasswordInputType } from '../../../components/redux-form/fields/PasswordInput/PasswordInputFormField';
import TextInputFormField from '../../../components/redux-form/fields/TextInput/TextInputFormField';
import { createAsyncValidator } from '../../../services/redux-form/validation';
import { ICredentials } from '../../service';
import styles from './styles.scss';

export interface ILoginFormData {
    username: string;
    password: string;
}

export interface ILoginFormDispatchProps {
    onLogin: (credentials: ICredentials) => void;
}

export interface ILoginFormStateProps {
    error?: string;
    isLoading: boolean;
}

export type ILoginFormBaseProps = ILoginFormDispatchProps & ILoginFormStateProps;

export type ILoginFormProps = ComponentFormProps<ILoginFormBaseProps, ILoginFormData>;

export class LoginForm extends React.PureComponent<ILoginFormProps> {
    render() {
        return (
            <form
                className={styles.container}
                onSubmit={this.props.handleSubmit(this.props.onLogin)}
                autoComplete="on"
            >
                <GutteredView>
                    <TextInputFormField
                        name="username"
                        label="Email"
                        type="email"
                        autoComplete="username"
                        isDisabled={this.props.isLoading}
                    />
                    <PasswordInputFormField
                        name="password"
                        label="Password"
                        type={PasswordInputType.Current}
                        isDisabled={this.props.isLoading}
                    />
                </GutteredView>
                <GutteredView className={styles.buttonContainer}>
                    <Link className={styles.link} to="/registration">
                        Create account
                    </Link>
                    <Button type="submit" isLoading={this.props.isLoading}>
                        Login
                    </Button>
                </GutteredView>
            </form>
        );
    }
}

const schema = Yup.object<ILoginFormData>().shape({
    username: Yup.string()
        .required('Please enter your email')
        .email('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
});

export default reduxForm<ILoginFormData, ILoginFormBaseProps>({
    form: 'login',
    pure: true,
    asyncValidate: createAsyncValidator(schema),
    shouldAsyncValidate,
})(LoginForm);
