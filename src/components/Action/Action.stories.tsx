import { storiesOf } from '@storybook/react';

import * as React from 'react';

import Action from './Action';

storiesOf('Action', module)
    .add('default', () => (
        <Action onClick={() => window.alert('Boo!')}>
            Zachary David Alexander Efron
        </Action>
    ))
    .add('disabled', () => (
        <Action onClick={() => window.alert('Boo!')} isDisabled>
            Zachary David Alexander Efron
        </Action>
    ));
