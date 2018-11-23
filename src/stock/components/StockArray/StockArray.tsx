import classNames from 'classnames';
import { List } from 'immutable';
import * as React from 'react';

import GutteredView from '../../../components/layout/GutteredView/GutteredView';
import { IStock } from '../../../state';
import StockItem, { StockState } from '../StockItem/StockItem';
import styles from './styles.scss';

export interface IStockArrayStateProps {
    stock: List<IStock>;
}

export interface IStockArrayOwnProps {
    className?: string;
}

export type IStockArrayProps = IStockArrayStateProps & IStockArrayOwnProps;

export class StockArray extends React.PureComponent<IStockArrayProps> {
    render() {
        return (
            <GutteredView className={classNames(styles.container, this.props.className)}>
                {this.props.stock
                    .sort((a, b) => {
                        if (!b.expiry) {
                            return -1;
                        }

                        return (
                            new Date(a.expiry).getTime() - new Date(b.expiry).getTime()
                        );
                    })
                    .map(stock => (
                        <StockItem
                            key={stock.id}
                            className={styles.stock}
                            {...stock}
                            state={this.stockState(stock)}
                        />
                    ))
                    .toArray()}
            </GutteredView>
        );
    }

    private static get WarningBoundary(): Date {
        const date = new Date();

        date.setDate(date.getDate() + 5);

        return date;
    }

    private stockState(stock: IStock) {
        const expiry = stock.expiry && new Date(stock.expiry);

        if (!expiry) {
            return StockState.Void;
        } else if (expiry < new Date()) {
            return StockState.Danger;
        } else if (expiry < StockArray.WarningBoundary) {
            return StockState.Warning;
        } else {
            return StockState.Safe;
        }
    }
}

export default StockArray;
