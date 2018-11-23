import * as React from 'react';

import EmptyPage from '../../components/layout/EmptyPage/EmptyPage';
import ContainerArrayContainer from '../../container/containers/ContainerArrayContainer/ContainerArrayContainer';
import StockArrayContainer from '../../stock/containers/StockArrayContainer/StockArrayContainer';

export const HomePage: React.SFC = () => (
    <EmptyPage>
        <ContainerArrayContainer />
        <StockArrayContainer />
    </EmptyPage>
);

export default HomePage;
