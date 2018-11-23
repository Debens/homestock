import { ComponentProps } from '../../../@types/redux-form';
import TextInput, { ITextInputInputProps, ITextInputMetaProps, ITextInputOwnProps } from '../../TextInput/TextInput';
import reduxFormComponent, { MapMetaToProps } from '../redux-form-component';
import { mapInputKeys } from '../redux-form-mapping';

export type ITextInputFormComponentProps = ComponentProps<ITextInputOwnProps>;

export const mapMetaToProps: MapMetaToProps<ITextInputMetaProps> = meta => ({
    isValid: meta.touched && meta.valid,
    isFocused: meta.active,
    error: meta.touched && meta.error,
});

export const mapInputToProps = mapInputKeys<ITextInputInputProps, ITextInputOwnProps>(
    'onChange',
    'onFocus',
    'onBlur',
    'value',
);

export const TextInputFormComponent = reduxFormComponent<
    ITextInputMetaProps,
    ITextInputInputProps,
    ITextInputOwnProps
>(mapMetaToProps, mapInputToProps)(TextInput);

export default TextInputFormComponent;
