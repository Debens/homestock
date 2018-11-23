import { storiesOf } from '@storybook/react';

import * as React from 'react';

import Snackbar from './Snackbar';

storiesOf('Snackbar', module)
    .add('default', () => <Snackbar>Zachary David Alexander Efron</Snackbar>)
    .add('w/ Action', () => (
        <Snackbar action={'Retry'} onAction={() => window.alert('Boo!')}>
            Zachary David Alexander Efron
        </Snackbar>
    ))
    .add('w/ Long text', () => (
        <Snackbar>
            Zachary David Alexander Efron Zachary David Alexander Efron Zachary David
            Alexander Efron Zachary David Alexander Efron Zachary David Alexander Efron
        </Snackbar>
    ))
    .add('w/ long text and action', () => (
        <Snackbar action={'Retry'} onAction={() => window.alert('Boo!')}>
            Zachary David Alexander Efron Zachary David Alexander Efron Zachary David
            Alexander Efron Zachary David Alexander Efron Zachary David Alexander Efron
        </Snackbar>
    ))
    .add('w/ long action', () => (
        <Snackbar
            action={
                'Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry Retry'
            }
            onAction={() => window.alert('Boo!')}
        >
            Zachary David Alexander Efron
        </Snackbar>
    ));
