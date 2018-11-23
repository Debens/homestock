import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import TextInput, { ITextInputProps } from './TextInput';

describe('Given a TextInput', () => {
    let props: ITextInputProps, wrapper: ShallowWrapper<ITextInputProps>;
    beforeEach(() => {
        props = {};

        wrapper = shallow(<TextInput {...props} />);
    });

    it('then should contain a text', () => {
        expect(wrapper.find('input')).toHaveLength(1);
    });

    describe('when is disbaled', () => {
        beforeEach(() => {
            props.isDisabled = true;

            wrapper.setProps(props);
        });

        it('then should disabled the input', () => {
            expect(wrapper.find('input').props().disabled).toBe(true);
        });
    });

    describe('given a label', () => {
        beforeEach(() => {
            props.label = 'Zachary';

            wrapper.setProps(props);
        });
        it('then should render the label', () => {
            expect(
                wrapper
                    .find('span')
                    .first()
                    .text(),
            ).toBe(props.label);
        });
    });

    describe('given a error', () => {
        beforeEach(() => {
            props.error = 'No Zachary';

            wrapper.setProps(props);
        });

        it('then should render the error', () => {
            expect(
                wrapper
                    .find('span')
                    .last()
                    .text(),
            ).toBe(props.error);
        });
    });

    describe('given an icon', () => {
        const icon = <div className="icon" />;
        const selector = '.icon';
        beforeEach(() => {
            props.icon = icon;

            wrapper.setProps(props);
        });

        it('then should render the icon', () => {
            expect(wrapper.find(selector)).toHaveLength(1);
        });
    });
});
