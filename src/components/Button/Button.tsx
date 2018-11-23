import classNames from 'classnames';
import * as React from 'react';

import Spinner from '../Spinner/Spinner';
import styles from './styles.scss';

export enum ButtonEmphasis {
    Low,
    Medium,
    High,
}

export interface IButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
    isLoading?: boolean;
    className?: string;
    type?: string;
    children: string;
}

export class Button extends React.PureComponent<IButtonProps> {
    render() {
        return (
            <button
                className={classNames(styles.button, this.props.className, {
                    [styles.disabled]: this.isDisabled,
                })}
                type={this.props.type}
                onClick={this.onPress}
            >
                <Spinner
                    className={classNames(styles.spinner, {
                        [styles.hidden]: !this.props.isLoading,
                    })}
                />
                <span
                    className={classNames(styles.text, {
                        [styles.textDisabled]: this.isDisabled,
                    })}
                >
                    {this.props.children.toUpperCase()}
                </span>
                {/* Flex placeholder */}
                <Spinner className={classNames(styles.spinner, styles.hidden)} />
            </button>
        );
    }

    private onPress = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClick && !this.isDisabled) {
            this.props.onClick(event);
        }
    };

    private get isDisabled(): boolean {
        return this.props.isDisabled || this.props.isLoading;
    }
}

export default Button;
