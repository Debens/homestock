import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppRoot } from './application/components/AppRoot/AppRoot';
import './resources/styles/global.scss';

export default () => {
    ReactDOM.render(<AppRoot />, document.getElementById('root'));
};
