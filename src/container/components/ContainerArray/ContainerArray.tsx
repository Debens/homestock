import classNames from 'classnames';
import { Iterable } from 'immutable';
import * as React from 'react';

import Spinner from '../../../components/Spinner/Spinner';
import ContainerCardContainer from '../../containers/ContainerCardContainer/ContainerCardContainer';
import styles from './styles.scss';

export interface IContainerArrayStateProps {
    containers: Iterable<number, string>;
    isLoading?: boolean;
}

export interface IContainerArrayOwnProps {
    className?: string;
}

export type IContainerArrayProps = IContainerArrayStateProps & IContainerArrayOwnProps;

export class ContainerArray extends React.PureComponent<IContainerArrayProps> {
    static readonly defaultProps: Partial<IContainerArrayProps> = {
        isLoading: false,
    };

    render() {
        return (
            <div className={classNames(styles.container, this.props.className)}>
                {this.props.isLoading ? (
                    <Spinner className={styles.spinner} />
                ) : (
                    this.props.containers.map((container, index) => (
                        <ContainerCardContainer
                            className={styles.tile}
                            id={container}
                            key={index}
                        />
                    ))
                )}
            </div>
        );
    }
}

export default ContainerArray;
