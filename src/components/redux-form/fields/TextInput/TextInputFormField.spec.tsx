import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Field } from 'redux-form';

import TextInputFormComponent from '../../components/TextInputFormComponent';
import TextInputFormField, { ITextInputFormFieldProps } from './TextInputFormField';

describe('TextInputFormField', () => {
    let props: ITextInputFormFieldProps,
        wrapper: ShallowWrapper<ITextInputFormFieldProps>;
    beforeEach(() => {
        props = { name: 'text input form field' };

        wrapper = shallow(<TextInputFormField {...props} />);
    });

    it('should be a redux-form field', () => {
        expect(wrapper.is(Field)).toBe(true);
    });

    it('should be a text input component', () => {
        expect(wrapper.find(Field).props().component).toBe(TextInputFormComponent);
    });
});
