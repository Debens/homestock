import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import Action from '../Action/Action';
import Snackbar, { ISnackbarProps } from './Snackbar';

describe('Given a Snackbar', () => {
    let props: ISnackbarProps, wrapper: ShallowWrapper<ISnackbarProps>;
    beforeEach(() => {
        props = {
            children: 'zachary david alexander efron',
        };

        wrapper = shallow(<Snackbar {...props} />);
    });

    it('then should render the text', () => {
        expect(wrapper.find('span')).toHaveLength(1);
        expect(wrapper.find('span').text()).toBe(props.children);
    });

    describe('given a action handler', () => {
        beforeEach(() => {
            props.onAction = jest.fn();

            wrapper.setProps(props);
        });

        it('then should not render an action', () => {
            expect(wrapper.find(Action)).toHaveLength(0);
        });

        describe('given action text', () => {
            beforeEach(() => {
                props.action = 'Zac efron';

                wrapper.setProps(props);
            });

            it('then should render the action', () => {
                expect(wrapper.find(Action)).toHaveLength(1);
            });

            describe('given the action renders', () => {
                it('then should render the action text', () => {
                    expect(
                        wrapper
                            .find(Action)
                            .children()
                            .text(),
                    ).toBe(props.action);
                });

                describe('when click', () => {
                    beforeEach(() => {
                        wrapper.find(Action).simulate('Click');
                    });

                    it('then should call props.onAction', () => {
                        expect(props.onAction).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});
