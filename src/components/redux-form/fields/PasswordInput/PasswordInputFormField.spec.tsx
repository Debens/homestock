import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Field } from 'redux-form';

import TextInputFormComponent from '../../components/TextInputFormComponent';
import PasswordInputFormField, { IPasswordInputFormFieldProps } from './PasswordInputFormField';

describe('PasswordInputFormField', () => {
    let props: IPasswordInputFormFieldProps,
        wrapper: ShallowWrapper<IPasswordInputFormFieldProps>;
    beforeEach(() => {
        props = { name: 'zachary efron' };

        wrapper = shallow(<PasswordInputFormField {...props} />);
    });

    it('should be a redux-form field', () => {
        expect(wrapper.is(Field)).toBe(true);
    });

    it('should be a text input component', () => {
        expect(wrapper.find(Field).props().component).toBe(TextInputFormComponent);
    });
});
