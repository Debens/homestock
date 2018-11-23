import classNames from 'classnames';
import { List } from 'immutable';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnyAction } from 'redux';

import Snackbar from '../../../components/Snackbar/Snackbar';
import { ISnackbarState } from '../../model';
import styles from './styles.scss';
import transition from './transition.scss';

export interface ISnackbarArrayOwnProps {
    className?: string;
}

export interface ISnackbarArrayStateProps {
    snackbars: List<ISnackbarState>;
}

export interface ISnackbarArrayDispatchProps {
    onAction: (id: string, actions: AnyAction) => void;
    onClick: (id: string) => void;
}

export type ISnackbarArrayProps = ISnackbarArrayOwnProps &
    ISnackbarArrayStateProps &
    ISnackbarArrayDispatchProps;

export class SnackbarArray extends React.PureComponent<ISnackbarArrayProps> {
    render() {
        return (
            <TransitionGroup
                className={classNames(this.props.className, styles.container)}
            >
                {this.props.snackbars.reverse().map(snackbar => (
                    <CSSTransition
                        key={snackbar.id}
                        timeout={400}
                        classNames={transition}
                    >
                        <Snackbar
                            key={snackbar.id}
                            className={styles.snackbar}
                            action={snackbar.actionText}
                            style={snackbar.style}
                            onAction={() =>
                                this.props.onAction(snackbar.id, snackbar.action)
                            }
                            onClick={() => this.props.onClick(snackbar.id)}
                        >
                            {snackbar.text}
                        </Snackbar>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        );
    }
}

export default SnackbarArray;
