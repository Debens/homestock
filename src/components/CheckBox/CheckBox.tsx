import classNames from 'classnames';
import * as React from 'react';

import IconBox from '../icons/IconBox/IconBox';
import IconCheckedBox from '../icons/IconCheckedBox/IconCheckedBox';
import styles from './styles.scss';

export interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isDisabled?: boolean;
    text: string | JSX.Element;
}

export interface ICheckBoxState {
    isChecked: boolean;
}

export class CheckBox extends React.PureComponent<ICheckBoxProps, ICheckBoxState> {
    readonly state = {
        isChecked: !!this.props.checked,
    };

    readonly checkboxId = Math.random().toString();

    render() {
        const { isDisabled, ...inputProps } = this.props;
        return (
            <div
                className={classNames(styles.checkboxContainer, this.props.className)}
                onClick={this.toggle}
            >
                {this.state.isChecked ? <IconCheckedBox /> : <IconBox />}
                <input
                    id={this.checkboxId}
                    {...inputProps}
                    className={styles.checkbox}
                    type="checkbox"
                    onChange={this.onChange}
                    checked={this.state.isChecked}
                />
                <div className={styles.checkboxTextContainer}>
                    <label className={styles.checkboxText} htmlFor={this.checkboxId}>
                        {this.props.text}
                    </label>
                </div>
            </div>
        );
    }

    private toggle = () => {
        this.setState(({ isChecked }) => ({ isChecked: !isChecked }));
    };

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.props.isDisabled) {
            this.toggle();
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        }
    };
}

export default CheckBox;
