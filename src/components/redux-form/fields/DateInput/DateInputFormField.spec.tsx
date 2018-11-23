import { ShallowWrapper } from 'enzyme';
import { List } from 'immutable';
import * as React from 'react';
import { Field } from 'redux-form';

import enzymeIntl from '../../../../../test/enzyme-intl';
import TextInputFormComponent from '../../components/TextInputFormComponent';
import DateInputFormField, { DateFormat } from './DateInputFormField';

describe('DateInputFormField', () => {
    let props: any, wrapper: ShallowWrapper<any>;
    beforeEach(() => {
        props = {
            name: 'date input form field',
        };

        wrapper = enzymeIntl.shallow(<DateInputFormField {...props} />);
    });

    it('should be a redux-form field component', () => {
        expect(wrapper.is(Field)).toBe(true);
    });

    it('should be named after the props', () => {
        expect(wrapper.find(Field).props().name).toBe(props.name);
    });

    describe('field component', () => {
        it('should be a text input', () => {
            expect(wrapper.find(Field).props().component).toBe(TextInputFormComponent);
        });

        describe('when format is DayMonthYear', () => {
            beforeEach(() => {
                props = { ...props, dateFormat: DateFormat.DayMonthYear };
                wrapper.setProps(props);
            });

            it('should be limited to 14 characters', () => {
                expect(wrapper.find(Field).props().maxLength).toBe(14);
            });

            it('should format the value to match the date format', () => {
                const format = wrapper.find(Field).props().format;

                const examples = List<{ from: string; to: string }>([
                    { from: '12121212-12-12', to: '12 / 12 / 1212' },
                    { from: '1212-12-12', to: '12 / 12 / 1212' },
                    { from: '1212-12-01', to: '01 / 12 / 1212' },
                    { from: '12-12', to: '12 / 12' },
                    { from: '12-01', to: '01 / 12' },
                    { from: '12', to: '12' },
                    { from: '01', to: '01' },
                ]);

                examples.forEach(example =>
                    expect(format(example.from, '')).toBe(example.to),
                );
            });

            it('should parse the value to match the date format', () => {
                const parse = wrapper.find(Field).props().parse;

                const examples = List<{ from: string; to: string }>([
                    { from: '12 / 12 / 1212', to: '1212-12-12' },
                    { from: '12 / 12 / 1', to: '1-12-12' },
                    { from: '12 / 12 / ', to: '12-12' },
                    { from: '12 / 12', to: '12-12' },
                    { from: '1', to: '1' },
                ]);

                examples.forEach(example =>
                    expect(parse(example.from, '')).toBe(example.to),
                );
            });
        });

        describe('when format is MonthYear', () => {
            beforeEach(() => {
                props = { ...props, dateFormat: DateFormat.MonthYear };
                wrapper.setProps(props);
            });

            it('should be limited to 9 characters', () => {
                expect(wrapper.find(Field).props().maxLength).toBe(9);
            });

            it('should format the value to match the format', () => {
                const format = wrapper.find(Field).props().format;

                const examples = List<{ from: string; to: string }>([
                    { from: '121212-12-01', to: '12 / 1212' },
                    { from: '1212-12-01', to: '12 / 1212' },
                    { from: '1-12-01', to: '12 / 1' },
                    { from: '12-01', to: '12' },
                    { from: '01', to: '' },
                    { from: '', to: '' },
                ]);

                examples.forEach(example =>
                    expect(format(example.from, '')).toBe(example.to),
                );
            });

            it('should parse the value to match the date format', () => {
                const parse = wrapper.find(Field).props().parse;

                const examples = List<{ from: string; to: string }>([
                    { from: '12 / 1212', to: '1212-12-01' },
                    { from: '12 / 121', to: '121-12-01' },
                    { from: '12 /  ', to: '12-01' },
                    { from: '1', to: '1-01' },
                ]);

                examples.forEach(example =>
                    expect(parse(example.from, '')).toBe(example.to),
                );
            });
        });
    });
});
