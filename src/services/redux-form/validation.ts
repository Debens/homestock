import { Map } from 'immutable';
import { Schema, ValidationError } from 'yup';

export const createAsyncValidator = <FormData>(schema: Schema<FormData>) => (
    values: FormData,
) =>
    schema
        .validate(values, { abortEarly: false })
        .then(() => Promise.resolve())
        .catch((errors: ValidationError) => {
            if (errors.inner && errors.inner.length) {
                throw errors.inner
                    .reduce(
                        (errors, error: ValidationError) =>
                            errors.set(error.path, error.message),
                        Map(),
                    )
                    .toJS();
            }
        });
