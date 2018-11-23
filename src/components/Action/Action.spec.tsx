import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import Action, { IActionProps } from './Action';

describe('Given a Action', () => {
    let props: IActionProps, wrapper: ShallowWrapper<IActionProps>;
    beforeEach(() => {
        props = {
            children: 'Zachary David Alexander Efron',
            onClick: jest.fn(),
        };

        wrapper = shallow(<Action {...props} />);
    });

    it('then should render the text', () => {
        expect(wrapper.children().text()).toBe(props.children.toUpperCase());
    });

    describe('when clicked', () => {
        beforeEach(() => {
            wrapper.simulate('Click');
        });

        it('then should call the handler', () => {
            expect(props.onClick).toHaveBeenCalled();
        });
    });

    describe('when the link is disabled', () => {
        beforeEach(() => {
            props.isDisabled = true;

            wrapper.setProps(props);
        });

        describe('when clicked', () => {
            beforeEach(() => {
                wrapper.simulate('Click');
            });

            it('then should not call the handler', () => {
                expect(props.onClick).not.toHaveBeenCalled();
            });
        });
    });
});
