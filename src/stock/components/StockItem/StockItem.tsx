import classNames from 'classnames';
import { Map } from 'immutable';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import IntlPureComponent from '../../../components/IntlPureComponent';
import { IStock } from '../../../state';
import styles from './styles.scss';

export enum StockState {
    Danger = 'danger',
    Warning = 'warning',
    Safe = 'safe',
    Void = 'void',
}

const stockStyles = Map<StockState, string>({
    [StockState.Danger]: styles.danger,
    [StockState.Warning]: styles.warning,
    [StockState.Safe]: styles.safe,
});

export interface IStockItemProps extends IStock {
    state?: StockState;
    className?: string;
}

export class StockItem extends IntlPureComponent<IStockItemProps> {
    static readonly defaultProps: Partial<IStockItemProps & InjectedIntlProps> = {
        state: StockState.Void,
    };

    render() {
        return (
            <div
                className={classNames(styles.container, this.style, this.props.className)}
            >
                <div className={styles.textContainer}>
                    <span className={styles.text}>{this.props.product.name}</span>
                    <span className={styles.text}>{this.props.quantity}</span>
                    {this.props.expiry && (
                        <span className={classNames(styles.text, styles.expiry)}>
                            {this.props.intl.formatRelative(new Date(this.props.expiry), {
                                style: 'numeric',
                            })}
                        </span>
                    )}
                </div>
            </div>
        );
    }

    private get style() {
        return stockStyles.get(this.props.state);
    }
}

export default injectIntl(StockItem);
