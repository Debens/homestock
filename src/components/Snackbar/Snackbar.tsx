import classNames from 'classnames';
import { Map } from 'immutable';
import * as React from 'react';

import Action from '../Action/Action';
import styles from './styles.scss';

export enum SnackbarStyle {
    Default = 'default',
    Error = 'error',
}

export interface ISnackbarProps {
    children: string;
    action?: string;
    onAction?: () => void;
    onClick?: () => void;
    className?: string;
    style?: SnackbarStyle;
}

export class Snackbar extends React.PureComponent<ISnackbarProps> {
    static readonly defaultProps: Partial<ISnackbarProps> = {
        style: SnackbarStyle.Default,
    };

    private static readonly containerStyles = Map<SnackbarStyle, string>({
        [SnackbarStyle.Default]: styles.containerBasic,
        [SnackbarStyle.Error]: styles.containerError,
    });

    private static readonly textStyles = Map<SnackbarStyle, string>({
        [SnackbarStyle.Default]: styles.textBasic,
        [SnackbarStyle.Error]: styles.textError,
    });

    private static readonly actionStyles = Map<SnackbarStyle, string>({
        [SnackbarStyle.Error]: styles.actionError,
    });

    render() {
        return (
            <div
                className={classNames(
                    this.props.className,
                    styles.container,
                    Snackbar.containerStyles.get(this.props.style),
                )}
                onClick={this.props.onClick}
            >
                <span
                    className={classNames(
                        styles.text,
                        Snackbar.textStyles.get(this.props.style),
                    )}
                >
                    {this.props.children}
                </span>
                {this.props.action && (
                    <div className={styles.actionContainer}>
                        <Action
                            className={classNames(
                                styles.action,
                                Snackbar.actionStyles.get(this.props.style),
                            )}
                            onClick={this.props.onAction}
                        >
                            {this.props.action}
                        </Action>
                    </div>
                )}
            </div>
        );
    }
}

export default Snackbar;
