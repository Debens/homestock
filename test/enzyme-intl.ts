import { mount, ReactWrapper, render, shallow, ShallowWrapper } from 'enzyme';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { InjectedIntl, IntlProvider, intlShape } from 'react-intl';
import { Store } from 'redux';
import createMockStore from 'redux-mock-store';

const storeShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
});

export const createStoreContext = <S = {}>(state?: S): { store: Store<S> } => ({
    store: createMockStore<S>()(state),
});

// allows optional passing of locale and messages so that translation can be tested
export const createIntlContext = (locale: string = 'en', messages: object = {}) =>
    new IntlProvider({ locale, messages }, {}).getChildContext();

// Intl context support for Enzyme adapted from...
// https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme

/**
 * Components using the react-intl module require access to the intl via context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid, English-locale intl context around them.
 * Also injects store context for containers
 */
export const enzymeIntl = {
    shallow: <P = any, S = any>(node: any, context: any = {}): ShallowWrapper<P, S> => {
        const intl = (context && context.intl) || createIntlContext('en');
        const store = (context && context.store) || createStoreContext({});
        return shallow(nodeWithIntlProp(node, intl.intl), {
            context: {
                ...context,
                ...store,
                ...intl,
            },
        });
    },

    mount: <P = any, S = any>(
        node: any,
        locale?: string,
        messages?: object,
        context: any = {},
        childContextTypes: any = {},
    ): ReactWrapper<P, S> => {
        const intl = (context && context.intl) || createIntlContext(locale, messages);
        const store = (context && context.store) || createStoreContext({});
        return mount<P, S>(nodeWithIntlProp(node, intl.intl), {
            context: {
                ...context,
                ...store,
                ...intl,
            },
            childContextTypes: Object.assign(
                {},
                { intl: intlShape, store: storeShape },
                childContextTypes,
            ),
        });
    },

    render: <P = any, S = any>(
        node: any,
        locale?: string,
        messages?: object,
        context: any = {},
        childContextTypes: any = {},
    ): Cheerio => {
        const intl = (context && context.intl) || createIntlContext(locale, messages);
        const store = (context && context.store) || createStoreContext({});
        return render<P, S>(nodeWithIntlProp(node, intl.intl), {
            context: {
                ...context,
                ...store,
                ...intl,
            },
            childContextTypes: Object.assign(
                {},
                { intl: intlShape, store: storeShape },
                childContextTypes,
            ),
        });
    },
};

// When using React-Intl `injectIntl` on components, props.intl is required.
function nodeWithIntlProp(node: any, intl: InjectedIntl): any {
    return React.cloneElement(node, { intl });
}

export default enzymeIntl;
