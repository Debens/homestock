import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';

export default abstract class IntlPureComponent<
    P = {},
    S = {}
> extends React.PureComponent<P & InjectedIntlProps, S> {}
