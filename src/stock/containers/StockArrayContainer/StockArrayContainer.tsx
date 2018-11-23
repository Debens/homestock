import { List } from 'immutable';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import container from '../../../container/index';
import { IAppState } from '../../../state';
import StockArray, { IStockArrayOwnProps, IStockArrayStateProps } from '../../components/StockArray/StockArray';
import stock from '../../index';

const mapStateToProps: MapStateToProps<
    IStockArrayStateProps,
    IStockArrayOwnProps,
    IAppState
> = state => ({
    stock: stock.selectors.createStockSelector(container.selectors.active(state))(state),
});

export const StockArrayContainer = connect<
    IStockArrayStateProps,
    {},
    IStockArrayOwnProps,
    IAppState
>(mapStateToProps)(StockArray);

export default StockArrayContainer;
