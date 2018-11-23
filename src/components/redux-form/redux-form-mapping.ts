import { WrappedFieldInputProps } from 'redux-form';

import { MapInputToProps } from './redux-form-component';

// For mapping redux-form input properties to component props
// only through the use of keys
// with complete type safety
export const mapInputKeys = <InputProps = {}, OwnProps = {}>(
    ...keys: SharedTypedKeys<InputProps, WrappedFieldInputProps>[]
): MapInputToProps<TypeOverlap<InputProps, WrappedFieldInputProps>, OwnProps> => input =>
    keys.reduce(
        (acc, key) => {
            acc[key] = input[key];

            return acc;
        },
        {} as TypeOverlap<InputProps, WrappedFieldInputProps>,
    );
