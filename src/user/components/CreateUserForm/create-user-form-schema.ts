import * as Yup from 'yup';

export const createUserFormSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    email: Yup.string()
        .required('Please enter your email')
        .email('Please enter a valid email'),
    password: Yup.string()
        .required('Please enter a password')
        .min(7, 'Password must be at least 7 characters')
        .matches(/(?=.*[0-9])/, {
            message: 'Password must container at least one number',
        })
        .matches(/(?=.*[A-Z])/, {
            message: 'Password must container at least one capital',
        }),
    birthday: Yup.date()
        .required('Please enter your birthday')
        .typeError('Please enter your birthday')
        .max(
            new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
            'You need to be at least 18 to create an account',
        )
        .min(
            new Date(
                new Date().setFullYear(
                    new Date().getFullYear() - parseInt(process.env.MAX_ACCOUNT_AGE, 10),
                ),
            ),
            'Please enter your birthday',
        ),
});

export default createUserFormSchema;
