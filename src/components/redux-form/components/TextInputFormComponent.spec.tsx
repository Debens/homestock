import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import TextInput, { ITextInputProps } from '../../TextInput/TextInput';
import TextInputFormComponent, { ITextInputFormComponentProps } from './TextInputFormComponent';

describe('TextInputFormComponent', () => {
    let props: ITextInputFormComponentProps,
        wrapper: ShallowWrapper<ITextInputFormComponentProps>;

    beforeEach(() => {
        props = {
            input: {
                onChange: jest.fn(),
                onBlur: jest.fn(),
                onFocus: jest.fn(),
                onDragStart: jest.fn(),
                onDrop: jest.fn(),
                name: 'test props',
                value: 1,
            },
            meta: {
                valid: false,
                active: false,
                touched: false,
            } as WrappedFieldMetaProps,
        };

        wrapper = shallow(<TextInputFormComponent {...props} />);
    });

    it('should render as a TextInput', () => {
        expect(wrapper.is(TextInput)).toBe(true);
    });

    describe('TextInput', () => {
        const inputKeys: (keyof WrappedFieldInputProps)[] = [
            'onChange',
            'onBlur',
            'onFocus',
            'value',
        ];

        inputKeys.forEach(key => {
            it(`should map ${key} from input props`, () => {
                expect(wrapper.find(TextInput).props()[key]).toBe(props.input[key]);
            });
        });

        describe('when field is active', () => {
            beforeEach(() => {
                props.meta.active = true;

                wrapper = shallow(<TextInputFormComponent {...props} />);
            });

            it('should be focused', () => {
                expect(wrapper.find(TextInput).props().isFocused).toBe(true);
            });
        });

        describe('when field is valid', () => {
            beforeEach(() => {
                props.meta.valid = true;

                wrapper = shallow(<TextInputFormComponent {...props} />);
            });
            it('should not be in valid state', () => {
                expect(wrapper.find(TextInput).props().isValid).toBe(false);
            });

            describe('when field is touched', () => {
                beforeEach(() => {
                    props.meta.touched = true;

                    wrapper = shallow(<TextInputFormComponent {...props} />);
                });
                it('should be valid', () => {
                    expect(wrapper.find(TextInput).props().isValid).toBe(true);
                });
            });
        });

        describe('when field has an error', () => {
            beforeEach(() => {
                props.meta.error = 'error';

                wrapper = shallow(<TextInputFormComponent {...props} />);
            });

            it('should not be in error state', () => {
                expect(wrapper.find(TextInput).props().error).toBeFalsy();
            });

            describe('when field is touched', () => {
                beforeEach(() => {
                    props.meta.touched = true;

                    wrapper = shallow(<TextInputFormComponent {...props} />);
                });

                it('should be in error state', () => {
                    expect(wrapper.find(TextInput).props().error).toBe('error');
                });
            });
        });
    });
});
