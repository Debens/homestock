import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import { createReduxFormProps } from '../../../../test/redux-form';
import Button from '../../../components/Button/Button';
import Link from '../../../components/Link/Link';
import PasswordInputFormField from '../../../components/redux-form/fields/PasswordInput/PasswordInputFormField';
import TextInputFormField from '../../../components/redux-form/fields/TextInput/TextInputFormField';
import { ILoginFormBaseProps, ILoginFormProps, LoginForm } from './LoginForm';

describe('Given a LoginForm', () => {
    let props: ILoginFormProps, wrapper: ShallowWrapper<ILoginFormBaseProps>;
    beforeEach(() => {
        props = {
            onLogin: jest.fn(),
            isLoading: false,
            ...createReduxFormProps(),
        };

        wrapper = shallow(<LoginForm {...props} />);
    });

    it('then should be a form', () => {
        expect(wrapper.is('form')).toBe(true);
    });

    it('then should render an email input', () => {
        expect(wrapper.find(TextInputFormField)).toHaveLength(1);
    });

    it('then should render a password input', () => {
        expect(wrapper.find(PasswordInputFormField)).toHaveLength(1);
    });

    it('then should render a login button', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(wrapper.find(Button).props().type).toBe('submit');
    });

    it('then should render a create account link', () => {
        expect(wrapper.find(Link)).toHaveLength(1);
        expect(wrapper.find(Link).props().to).toBe('/registration');
    });

    describe('when the form is submitted', () => {
        beforeEach(() => {
            wrapper.simulate('submit');
        });

        it('then should call props.onLogin', () => {
            expect(props.onLogin).toHaveBeenCalled();
        });
    });

    describe('when the form is loading', () => {
        beforeEach(() => {
            props.isLoading = true;

            wrapper.setProps(props);
        });

        it('then should disable the inputs', () => {
            expect(wrapper.find(TextInputFormField).props().isDisabled).toBe(true);
            expect(wrapper.find(PasswordInputFormField).props().isDisabled).toBe(true);
            expect(wrapper.find(Button).props().isLoading).toBe(true);
        });
    });
});
