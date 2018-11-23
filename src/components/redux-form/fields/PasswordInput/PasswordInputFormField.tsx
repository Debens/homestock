import * as React from 'react';
import { Field } from 'redux-form';

import IconClosedEye from '../../../icons/IconClosedEye/IconClosedEye';
import IconOpenEye from '../../../icons/IconOpenEye/IconOpenEye';
import { ITextInputOwnProps } from '../../../TextInput/TextInput';
import TextInputFormComponent from '../../components/TextInputFormComponent';
import { FormFieldProps } from '../../redux-form-field';

export enum PasswordInputType {
    New = 'current-password',
    Current = 'new-password',
}

export interface IPasswordInputFormFieldConfig {
    type: string;
    autoComplete: string;
}

export interface IPasswordInputFormFieldProps
    extends FormFieldProps<ITextInputOwnProps, IPasswordInputFormFieldConfig> {
    isVisible?: boolean;
    type?: PasswordInputType;
}

export interface IPasswordInputState {
    isVisible: boolean;
}

export class PasswordInputFormField extends React.PureComponent<
    IPasswordInputFormFieldProps,
    IPasswordInputState
> {
    static readonly defaultProps: Partial<IPasswordInputFormFieldProps> = {
        isVisible: false,
        type: PasswordInputType.Current,
    };

    readonly state: IPasswordInputState = {
        isVisible: this.props.isVisible,
    };

    render() {
        const { isVisible, type, ...inputProps } = this.props;

        return (
            <Field
                {...inputProps}
                type={this.inputType}
                autoComplete={type}
                icon={
                    this.state.isVisible ? (
                        <IconClosedEye onClick={this.toggle} />
                    ) : (
                        <IconOpenEye onClick={this.toggle} />
                    )
                }
                component={TextInputFormComponent}
            />
        );
    }

    private get inputType(): string {
        return this.state.isVisible ? 'text' : 'password';
    }

    private toggle = () => this.setState(({ isVisible }) => ({ isVisible: !isVisible }));
}

export default PasswordInputFormField;
