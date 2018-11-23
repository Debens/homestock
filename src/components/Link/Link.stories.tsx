import { storiesOf } from '@storybook/react';

import * as React from 'react';

import Link from './Link';

storiesOf('Link', module)
    .add('default', () => (
        <Link to="http://www.google.com">Zachary David Alexander Efron</Link>
    ))
    .add('disabled', () => (
        <Link to="http://www.google.com" isDisabled>
            Zachary David Alexander Efron
        </Link>
    ))
    .add('w/ long children', () => (
        <Link to="http://www.google.com">
            A Really Really Really Really Really Really Really Really Really Really Really
            Really Really Really Really Really Really Really Really Really Really Really
            Really Really Really Really Really Really Really Really Really Really Really
            Really Really Really Really Really Really Really Really Really Really Really
            Really Really Really Long Link
        </Link>
    ));
