import classNames from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';

import IntlPureComponent from '../../../components/IntlPureComponent';
import { IContainer } from '../../../state';
import ContainerImage from '../ContainerImage/ContainerImage';
import styles from './styles.scss';

export interface IContainerCardDispatchProps {
    onSelect?: () => void;
}

export interface IContainerCardStateProps extends IContainer {
    size: number;
}

export interface IContainerCardOwnProps {
    className?: string;
    id: string;
}

export type IContainerCardProps = IContainerCardStateProps &
    IContainerCardDispatchProps &
    IContainerCardOwnProps;

export class ContainerCard extends IntlPureComponent<IContainerCardProps> {
    render() {
        return (
            <div
                className={classNames([styles.container, this.props.className])}
                onClick={this.props.onSelect}
            >
                <ContainerImage className={styles.image} />
                <div className={styles.overlap}>
                    <span className={styles.name}>{this.props.name}</span>
                </div>
                <div className={styles.lowdown}>
                    <div className={styles.text}>{this.quantity}</div>
                    <div className={styles.text}>{this.memberCount}</div>
                </div>
            </div>
        );
    }

    private get quantity(): string {
        return this.props.intl
            .formatMessage(
                {
                    id: 'container-tile.detail.quantity',
                    defaultMessage: `{quantity} {${this.props.intl.formatPlural(
                        parseInt(this.props.size.toString(), 10),
                    )}}`,
                },
                {
                    quantity: this.props.intl.formatNumber(this.props.size),
                    one: 'item',
                    other: 'items',
                },
            )
            .toUpperCase();
    }

    private get memberCount(): string {
        return this.props.intl
            .formatMessage(
                {
                    id: 'container-tile.detail.members',
                    defaultMessage: `{count} {${this.props.intl.formatPlural(
                        this.props.memberships.length,
                    )}}`,
                },
                {
                    count: this.props.intl.formatNumber(this.props.memberships.length),
                    one: 'member',
                    other: 'members',
                },
            )
            .toUpperCase();
    }
}

export default injectIntl(ContainerCard);
