import {
    BaseFieldProps,
    ConfigProps,
    InjectedFormProps,
    WrappedFieldProps,
} from 'redux-form';

// redux-form does not export complete types that they are expecting you to make your component conform by, because some people just to watch the world burn
// The following types are used to match redux-form
// TODO: Create a redux-form PR adjusting the types -- their types are in their own repository

// Props type that would be required to match a redux-form component
export type ComponentProps<OwnProps> = OwnProps & WrappedFieldProps;

// Props type that would be required to match a redux-form field
export type FieldProps<OwnProps> = BaseFieldProps<OwnProps> & OwnProps;

// Props type that would be required to match a component to be consumed by a redux-form creator
export type ComponentFormProps<Props, FormData> = Props &
    InjectedFormProps<FormData, Props>;

// Props type that would be required for the component result of the redux-form HOC form creator
export type FormProps<FormData, Props, UsedProps = {}> = OmitOverlap<
    Props & ConfigProps<FormData, Props>,
    UsedProps
>;

export type FormValue = string | boolean | number;

export type FormValues<FormData> = { [k in keyof FormData]: FormValue };
