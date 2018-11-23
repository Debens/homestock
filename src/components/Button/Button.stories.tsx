import { storiesOf } from '@storybook/react';

import * as React from 'react';

import { Button } from './Button';

storiesOf('Button', module)
    .add('Default', () => <Button>Zachary Efron</Button>)
    .add('Disabled', () => <Button isDisabled>Zachary Efron</Button>)
    .add('Loading', () => <Button isLoading>Zachary Efron</Button>);
