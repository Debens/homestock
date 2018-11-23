import * as React from 'react';
import { Field } from 'redux-form';

import { ComponentProps, FieldProps } from '../../@types/redux-form';

// Removes all the 'used' types from the required field props
// i.e. all the keys of GivenProps & 'component' from BaseFieldProps<OwnProps> & OwnProps
export type FormFieldProps<OwnProps, GivenProps = {}> = Omit<
    OmitOverlap<FieldProps<OwnProps>, GivenProps>,
    'component'
>;

// Creates a redux-form Field top level Component with type safety
// Injects any given config into the Field, and removes the keys from the returned component props API
const reduxFormField = <OwnProps, GivenProps = {}>(config: GivenProps) => (
    Component: React.ComponentType<ComponentProps<OwnProps>>,
) =>
    class ReduxFormField extends React.PureComponent<
        FormFieldProps<OwnProps, GivenProps>
    > {
        // redux-form requires a ComponentType, but does not play when combining with the generic OwnProps
        // Compromise as it does not effect the external type safety
        static readonly FormField = Field as any;

        render() {
            return (
                <ReduxFormField.FormField
                    component={Component}
                    {...Object.assign({}, config, this.props)}
                />
            );
        }
    };

export default reduxFormField;
