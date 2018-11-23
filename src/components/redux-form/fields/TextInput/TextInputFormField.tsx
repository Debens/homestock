import { ITextInputOwnProps } from '../../../TextInput/TextInput';
import TextInputFormComponent from '../../components/TextInputFormComponent';
import reduxFormField, { FormFieldProps } from '../../redux-form-field';

export type ITextInputFormFieldProps = FormFieldProps<ITextInputOwnProps>;

export const TextInputFormField = reduxFormField<ITextInputOwnProps>({})(
    TextInputFormComponent,
);

export default TextInputFormField;
