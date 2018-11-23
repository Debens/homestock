import { configure } from '@storybook/react';
import { setAddon, addDecorator } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';

import { setIntlConfig, withIntl } from 'storybook-addon-intl';

// Load the locale data for all your defined locales
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';

addLocaleData(enLocaleData);
const getMessages = locale => ({}); // TODO: Add messages

setIntlConfig({
    locales: ['en'],
    defaultLocale: 'en',
    getMessages,
});

addDecorator(withIntl);
addDecorator(withKnobs);
setAddon(JSXAddon);

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
    require('./welcomeStory');
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
