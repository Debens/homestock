import React from 'react';

import { storiesOf } from '@storybook/react';
import { wInfo } from './utils';

storiesOf('Homestock', module).addWithJSX(
    'welcome',
    wInfo(`
    Welcome to the Homestock compeont storybook
  `)(() => <div />),
);
