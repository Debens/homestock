import classNames from 'classnames';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { isInternal } from '../../utils/urls';
import styles from './styles.scss';

export interface ILinkProps extends Partial<ILinkDefaultProps> {
    to?: string;
    children: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export interface ILinkDefaultProps {
    isDisabled: boolean;
}

export class Link extends React.PureComponent<ILinkProps> {
    static defaultProps: ILinkDefaultProps = {
        isDisabled: false,
    };

    render() {
        const baseProps = {
            className: classNames(styles.link, {
                [styles.disabled]: this.props.isDisabled,
            }),
            style: this.props.style,
            onClick: this.onClick,
        };

        return (
            <div
                className={classNames(styles.container, this.props.className, {
                    [styles.disabled]: this.props.isDisabled,
                })}
            >
                {isInternal(this.props.to) ? (
                    <RouterLink {...baseProps} to={this.props.to} onClick={this.onClick}>
                        {this.props.children.toUpperCase()}
                    </RouterLink>
                ) : (
                    <a {...baseProps} href={this.props.isDisabled ? '#' : this.props.to}>
                        {this.props.children.toUpperCase()}
                    </a>
                )}
            </div>
        );
    }

    private onClick = () => {
        if (this.props.onClick && !this.props.isDisabled) {
            this.props.onClick();
        }
    };
}

export default Link;
