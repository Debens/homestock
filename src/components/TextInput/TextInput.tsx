import classNames from 'classnames';
import { timingSafeEqual } from 'crypto';
import * as React from 'react';

import styles from './styles.scss';

export interface ITextInputInputProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    value?: any;
}

export interface ITextInputMetaProps {
    isFocused?: boolean;
    isValid?: boolean;
    error?: string;
}

type UnmappedInputKeys = Exclude<
    keyof React.InputHTMLAttributes<HTMLInputElement>,
    keyof ITextInputInputProps
>;
type OverriddenInputKeys = 'editable';

type RemainingInputProps = Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    Exclude<UnmappedInputKeys, OverriddenInputKeys>
>;

export interface ITextInputOwnProps extends RemainingInputProps {
    label?: string;
    isDisabled?: boolean;
    icon?: JSX.Element;
}

export type ITextInputProps = ITextInputInputProps &
    ITextInputMetaProps &
    ITextInputOwnProps;

export class TextInput extends React.PureComponent<ITextInputProps> {
    render() {
        const {
            label,
            isDisabled,
            isFocused,
            isValid,
            className,
            error,
            icon,
            ...inputProps
        } = this.props;

        return (
            <div className={classNames(styles.container, this.props.className)}>
                <div
                    className={classNames(styles.wrapper, {
                        [styles.wrapperError]: error,
                        [styles.wrapperValid]: isValid,
                        [styles.wrapperSelected]: isFocused,
                    })}
                >
                    <input
                        className={classNames(styles.input)}
                        placeholder="&nbsp;"
                        disabled={isDisabled}
                        {...inputProps}
                    />
                    <span
                        className={classNames(styles.label, {
                            [styles.labelError]: error,
                            [styles.labelValid]: isValid,
                            [styles.labelSelected]: isFocused,
                            [styles.labelDisabled]: this.props.isDisabled,
                        })}
                    >
                        {label}
                    </span>
                    {icon && <div className={styles.iconContainer}>{icon}</div>}
                </div>
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
}

export default TextInput;
