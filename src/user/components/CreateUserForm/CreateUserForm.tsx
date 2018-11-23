import * as React from 'react';
import { reduxForm } from 'redux-form';
import { shouldAsyncValidate } from 'redux-form-yup';

import { ComponentFormProps } from '../../../@types/redux-form';
import { Button } from '../../../components/Button/Button';
import { CheckBox } from '../../../components/CheckBox/CheckBox';
import GutteredView from '../../../components/layout/GutteredView/GutteredView';
import DateInputFormField, { DateFormat } from '../../../components/redux-form/fields/DateInput/DateInputFormField';
import PasswordInputFormField, { PasswordInputType } from '../../../components/redux-form/fields/PasswordInput/PasswordInputFormField';
import TextInputFormField from '../../../components/redux-form/fields/TextInput/TextInputFormField';
import { createAsyncValidator } from '../../../services/redux-form/validation';
import { createUserFormSchema } from './create-user-form-schema';
import styles from './styles.scss';

export interface ICreateUserFormData {
    firstName: string;
    lastName: string;
    birthday: Date;
    email: string;
    password: string;
    acceptedMarketing: boolean;
}

export interface ICreateUserFormDispatchProps {
    onSubmit: (formData: ICreateUserFormData) => void;
}

export interface ICreateUserFormStateProps {
    error: string;
    isLoading: boolean;
}

export type ICreateUserFormBaseProps = ICreateUserFormDispatchProps &
    ICreateUserFormStateProps;

export type ICreateUserFormProps = ComponentFormProps<
    ICreateUserFormBaseProps,
    ICreateUserFormData
>;

export class CreateUserForm extends React.PureComponent<ICreateUserFormProps> {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} autoComplete="on">
                <GutteredView>
                    <TextInputFormField
                        name="firstName"
                        label="First Name"
                        autoComplete="given-name"
                        isDisabled={this.props.isLoading}
                    />
                    <TextInputFormField
                        name="lastName"
                        label="Last Name"
                        autoComplete="family-name"
                        isDisabled={this.props.isLoading}
                    />
                    <DateInputFormField
                        name="birthday"
                        label="Birthday"
                        isDisabled={this.props.isLoading}
                        dateFormat={DateFormat.DayMonthYear}
                    />
                    <TextInputFormField
                        name="email"
                        label="Email"
                        type="email"
                        autoComplete="username"
                        isDisabled={this.props.isLoading}
                    />
                    <PasswordInputFormField
                        name="password"
                        label="Password"
                        type={PasswordInputType.New}
                        isDisabled={this.props.isLoading}
                    />
                </GutteredView>
                <GutteredView className={styles.actionContainer}>
                    <CheckBox
                        className={styles.action}
                        text="Sign up to hear about the latest updates"
                        checked={false}
                        isDisabled={this.props.isLoading}
                    />
                    <Button
                        className={styles.action}
                        type="submit"
                        isLoading={this.props.isLoading}
                    >
                        Create
                    </Button>
                </GutteredView>
            </form>
        );
    }
}

export default reduxForm<ICreateUserFormData, ICreateUserFormBaseProps>({
    form: 'registration',
    pure: true,
    asyncValidate: createAsyncValidator(createUserFormSchema),
    shouldAsyncValidate,
})(CreateUserForm);
