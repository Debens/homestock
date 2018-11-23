import * as React from 'react';
// import { KeyboardTypeOptions } from 'react-native';
import { Field, Formatter, Parser } from 'redux-form';

import { ITextInputOwnProps } from '../../../TextInput/TextInput';
import TextInputFormComponent from '../../components/TextInputFormComponent';
import { FormFieldProps } from '../../redux-form-field';

const DIVIDER_REGEX = /\//g;

export enum DateFormat {
    MonthYear = 'MM/YYYY',
    DayMonthYear = 'DD/MM/YYYY',
}

export interface IDateInputFormFieldConfig {
    maxLength: number;
    type: string;
    format: Formatter;
    parse: Parser;
}

export interface IDateInputFormFieldProps
    extends FormFieldProps<ITextInputOwnProps, IDateInputFormFieldConfig> {
    dateFormat?: DateFormat;
}

export class DateInputFormField extends React.PureComponent<IDateInputFormFieldProps> {
    static readonly defaultProps: Partial<IDateInputFormFieldProps> = {
        dateFormat: DateFormat.DayMonthYear,
    };

    render() {
        const { dateFormat, ...inputProps } = this.props;

        const config: IDateInputFormFieldConfig = {
            format: this.format,
            parse: this.parse,
            maxLength: this.maxLength,
            type: 'numeric',
        };

        return <Field {...inputProps} {...config} component={TextInputFormComponent} />;
    }

    private get maxLength(): number {
        return this.props.dateFormat.replace(DIVIDER_REGEX, ' / ').length;
    }

    // parses from user input into the format the store accepts
    private parse = (value: string = ''): string => {
        const numericString = value.replace(/\D/g, '');

        const dateStr = numericString
            .split('')
            .slice(0, this.maxLength)
            .reduce(
                (current: string, char: string) =>
                    this.props.dateFormat[current.length] === '/'
                        ? current + '/' + char
                        : current + char,
                '',
            )
            .split('/')
            .reverse()
            .join('-');

        return this.props.dateFormat === DateFormat.MonthYear ? `${dateStr}-01` : dateStr;
    };

    // formats a value from the store to a friendly display value for user
    private format = (value: string = ''): string =>
        value
            .split('-')
            .reverse()
            .slice(this.props.dateFormat === DateFormat.MonthYear ? 1 : 0)
            .join(' / ')
            .slice(0, this.maxLength);
}

export default DateInputFormField;
