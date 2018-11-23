import { List } from 'immutable';
import * as React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

import { ComponentProps } from '../../@types/redux-form';

export interface MapInputToProps<InputProps, OwnProps = {}> {
    (input: WrappedFieldInputProps, props?: OwnProps): InputProps;
}

export interface MapMetaToProps<MetaProps, OwnProps = {}> {
    (meta: WrappedFieldMetaProps, props?: OwnProps): MetaProps;
}

export interface ReduxFormFieldComponent<MetaProps, InputProps, OwnProps = {}> {
    (
        WrappedComponent: React.ComponentType<OwnProps & MetaProps & InputProps>,
    ): React.ComponentType<ComponentProps<OwnProps>>;
}

// Wrapper for mapping dumb components into redux-form components
// that can be passed to redux-form field with type safety.
// Maps redux-form meta and input props to component props
export function reduxFormComponent<MetaProps = {}, InputProps = {}, OwnProps = {}>(
    mapMetaToProps: MapMetaToProps<MetaProps, OwnProps>,
    mapInputToProps: MapInputToProps<InputProps, OwnProps>,
): ReduxFormFieldComponent<MetaProps, InputProps, OwnProps> {
    return FieldComponent =>
        class extends React.PureComponent<ComponentProps<OwnProps>> {
            render() {
                const { children, meta, input } = this.props;

                // FIXME: - Can't use spread for generics, see:
                // issue https://github.com/Microsoft/TypeScript/issues/10727
                // PR https://github.com/Microsoft/TypeScript/pull/13288
                const ownProps = remainingProps<
                    Readonly<OwnProps>,
                    Readonly<{ children?: React.ReactNode }> &
                        Readonly<WrappedFieldProps & OwnProps>
                >(this.props, 'children', 'meta', 'input');

                const metaProps = mapMetaToProps ? mapMetaToProps(meta, ownProps) : {};
                const inputProps = mapInputToProps
                    ? mapInputToProps(input, ownProps)
                    : {};

                return (
                    <FieldComponent {...metaProps} {...inputProps} {...ownProps}>
                        {children}
                    </FieldComponent>
                );
            }
        };
}

const remainingProps = <Prop, Props extends Prop>(
    props: Props,
    ...keys: (keyof Props)[]
): Prop => {
    const copy = Object.assign({}, props);
    const stringKeys = List(keys.map(key => key.toString()));

    Object.keys(props).forEach(key => {
        if (!stringKeys.includes(key)) {
            copy[key as keyof Props] = props[key as keyof Props];
        }
    });

    return copy as Prop;
};

export default reduxFormComponent;
