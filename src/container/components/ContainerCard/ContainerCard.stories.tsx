import { storiesOf } from '@storybook/react';

import * as React from 'react';

import { IContainer } from '../../../state';
import ContainerCard from './ContainerCard';

const container: IContainer = {
    id: '123',
    name: 'Zachary Efron',
    created: new Date(),
    memberships: [],
};

storiesOf('ContainerCard', module).add('default', () => (
    <ContainerCard {...container} size={20} />
));
