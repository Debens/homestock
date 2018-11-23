import { connect, MapStateToProps } from 'react-redux';

import { IAppState } from '../../../state';
import ContainerArray, { IContainerArrayOwnProps, IContainerArrayStateProps } from '../../components/ContainerArray/ContainerArray';
import container from '../../index';

const mapStateToProps: MapStateToProps<
    IContainerArrayStateProps,
    IContainerArrayOwnProps,
    IAppState
> = state => ({
    containers: container.selectors.all(state).map(container => container.id),
    isLoading: container.selectors.isLoading(state),
});

export const ContainerArrayContainer = connect<
    IContainerArrayStateProps,
    {},
    IContainerArrayOwnProps,
    IAppState
>(mapStateToProps)(ContainerArray);

export default ContainerArrayContainer;
