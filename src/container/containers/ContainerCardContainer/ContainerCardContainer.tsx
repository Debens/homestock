import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import container from '../..';
import { IAppState } from '../../../state';
import stock from '../../../stock';
import ContainerCard, { IContainerCardDispatchProps, IContainerCardOwnProps, IContainerCardStateProps } from '../../components/ContainerCard/ContainerCard';

const mapStateToProps: MapStateToProps<
    IContainerCardStateProps,
    IContainerCardOwnProps,
    IAppState
> = (state, props) => ({
    ...container.selectors.container(state, props.id),
    size: stock.selectors.quantity(state, props.id),
});

const mapDispatchToProps: MapDispatchToProps<
    IContainerCardDispatchProps,
    IContainerCardOwnProps
> = (dispatch, props) => ({
    onSelect: () => dispatch(container.actions.select(props.id)),
});

export const ContainerCardContainer = connect<
    IContainerCardStateProps,
    IContainerCardDispatchProps,
    IContainerCardOwnProps,
    IAppState
>(mapStateToProps, mapDispatchToProps)(ContainerCard);

export default ContainerCardContainer;
