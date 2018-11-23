import { ShallowWrapper } from 'enzyme';
import * as React from 'react';

import enzymeIntl from '../../../../test/enzyme-intl';
import StockItem, { IStockItemProps } from './StockItem';

describe('Given a StockItem', () => {
    let props: IStockItemProps, wrapper: ShallowWrapper<IStockItemProps>;
    beforeEach(() => {
        props = {
            id: '123',
            created: new Date().toISOString(),
            quantity: '2',
            product: {
                id: '123',
                name: 'Zachary Efron',
                created: new Date().toISOString(),
            },
        };

        wrapper = enzymeIntl.shallow(<StockItem {...props} />).dive();
    });

    it('then should render the product name', () => {
        expect(
            wrapper
                .find('span')
                .first()
                .text(),
        ).toBe(props.product.name);
    });

    it('then should render the quantity', () => {
        expect(
            wrapper
                .find('span')
                .at(1)
                .text(),
        ).toBe(props.quantity);
    });

    describe('given an expiry date', () => {
        beforeEach(() => {
            props.expiry = new Date().toISOString();

            wrapper.setProps(props);
        });

        it('then should render the expiry date', () => {
            expect(
                wrapper
                    .find('span')
                    .last()
                    .text(),
            ).toBe('in 0 seconds');
        });
    });
});
