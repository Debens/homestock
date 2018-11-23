import classNames from 'classnames';
import * as React from 'react';

import styles from './styles.scss';

export interface IActionProps {
    onClick: (event?: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    isDisabled?: boolean;
    children: string;
}

export class Action extends React.PureComponent<IActionProps> {
    static readonly defaultProps: Partial<IActionProps> = {
        isDisabled: false,
    };

    render() {
        return (
            <div
                className={classNames(this.props.className, styles.container, {
                    [styles.disabled]: this.props.isDisabled,
                })}
                onClick={this.onClick}
            >
                <span
                    className={classNames(styles.text, {
                        [styles.disabled]: this.props.isDisabled,
                    })}
                >
                    {this.props.children.toUpperCase()}
                </span>
            </div>
        );
    }
    private onClick = () => {
        if (!this.props.isDisabled) {
            this.props.onClick();
        }
    };
}

export default Action;
