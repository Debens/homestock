import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import { Button, IButtonProps } from './Button';

describe('Button', () => {
    const buttonText = 'click me';
    let wrapper: ShallowWrapper, props: IButtonProps;
    beforeEach(() => {
        props = { onClick: jest.fn(), children: buttonText };

        wrapper = shallow(<Button {...props} />);
    });

    it('should render the button text', () => {
        expect(wrapper.find('span').text()).toBe(buttonText.toUpperCase());
    });

    describe('if not disabled', () => {
        beforeEach(() => {
            const { isDisabled, ...newProps } = props;
            props = newProps;

            wrapper = shallow(<Button {...props}>{buttonText}</Button>);
        });

        describe('when clicked', () => {
            beforeEach(() => wrapper.find('button').simulate('click'));

            it('should call props.onPress', () => {
                expect(props.onClick).toHaveBeenCalled();
            });
        });
    });

    describe('if disabled', () => {
        beforeEach(() => {
            props.isDisabled = true;
            wrapper = shallow(<Button {...props}>{buttonText}</Button>);
        });

        describe('when clicked', () => {
            beforeEach(() => wrapper.simulate('click'));

            it('should not call props.onPress', () => {
                expect(props.onClick).not.toHaveBeenCalled();
            });
        });
    });
});
