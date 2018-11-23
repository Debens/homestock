import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link, { ILinkProps } from './Link';

describe('Given a Link', () => {
    let props: ILinkProps, wrapper: ShallowWrapper<ILinkProps>;
    const label = 'Zachary Efron';
    beforeEach(() => {
        props = {
            to: '/',
            children: label,
        };

        wrapper = shallow(<Link {...props} />);
    });

    describe('given a internal link', () => {
        beforeEach(() => {
            props.to = '/internal';

            wrapper.setProps(props);
        });

        it('then should render the text', () => {
            expect(
                wrapper
                    .find(RouterLink)
                    .children()
                    .text(),
            ).toBe(label.toUpperCase());
        });

        it('then it should be a react-router link', () => {
            expect(wrapper.find(RouterLink)).toHaveLength(1);
        });

        describe('when is a react-router link', () => {
            it('then should go to the give route', () => {
                expect(wrapper.find(RouterLink).props().to).toBe(props.to);
            });
        });
    });

    describe('given a external link', () => {
        beforeEach(() => {
            props.to = 'https://www.external.com';

            wrapper.setProps(props);
        });

        it('then should render the text', () => {
            expect(
                wrapper
                    .find('a')
                    .children()
                    .text(),
            ).toBe(label.toUpperCase());
        });

        it('should be a regular link element', () => {
            expect(wrapper.find('a')).toHaveLength(1);
        });

        describe('when is a regular link element', () => {
            it('then should go to the give route', () => {
                expect(wrapper.find('a').props().href).toBe(props.to);
            });

            describe('when is disabled', () => {
                beforeEach(() => {
                    props.isDisabled = true;

                    wrapper.setProps(props);
                });

                it('then should not link out', () => {
                    expect(wrapper.find('a').props().href).toBe('#');
                });
            });
        });
    });

    describe('given a on click handler', () => {
        beforeEach(() => {
            props.onClick = jest.fn();

            wrapper.setProps(props);
        });

        describe('when clicked', () => {
            beforeEach(() => {
                wrapper.find(RouterLink).simulate('Click');
            });

            it('then should call the handler', () => {
                expect(props.onClick).toHaveBeenCalled();
            });
        });

        describe('when the link is disabled', () => {
            beforeEach(() => {
                props.isDisabled = true;

                wrapper.setProps(props);
            });

            describe('when clicked', () => {
                beforeEach(() => {
                    wrapper.find(RouterLink).simulate('Click');
                });

                it('then should not call the handler', () => {
                    expect(props.onClick).not.toHaveBeenCalled();
                });
            });
        });
    });
});
