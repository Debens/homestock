import { storiesOf } from '@storybook/react';

import * as React from 'react';

import { TextInput } from './TextInput';

storiesOf('TextInput', module)
    .add('Default', () => <TextInput />)
    .add('Disabled', () => <TextInput label="Label" isDisabled />)
    .add('Valid', () => <TextInput label="Label" isValid />)
    .add('Focused', () => <TextInput label="Label" isFocused />)
    .add('w/ Label', () => <TextInput label="Label" />)
    .add('w/ Initial value', () => (
        <TextInput label="Label" defaultValue="Inital value" />
    ))
    .add('w/ Error', () => (
        <TextInput label="Label" error="Please enter a valid value" />
    ));
