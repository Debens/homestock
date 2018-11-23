import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import EmptyPage from '../EmptyPage/EmptyPage';
import CenteredPage, { ICenteredPageProps } from './CenteredPage';
import styles from './styles.scss';

describe('Given a CenteredPage', () => {
    let wrapper: ShallowWrapper<ICenteredPageProps>;
    const render = (props?: ICenteredPageProps, children?: JSX.Element) =>
        shallow(<CenteredPage {...props}>{children}</CenteredPage>);

    beforeEach(() => {
        wrapper = render();
    });

    it('then should be an empty page', () => {
        expect(wrapper.is(EmptyPage)).toBe(true);
    });
});
