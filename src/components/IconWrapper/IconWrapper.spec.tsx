import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import IconWrapper, { IIconWrapperProps } from './IconWrapper';

describe('Icon', () => {
    let props: IIconWrapperProps, wrapper: ShallowWrapper<IIconWrapperProps>;
    const content = <span>Icon</span>;
    beforeEach(() => {
        props = {
            onClick: jest.fn(),
        };

        wrapper = shallow(<IconWrapper {...props}>{content}</IconWrapper>);
    });

    it('should wrap the content', () => {
        expect(wrapper.contains(content)).toBe(true);
    });

    describe('when clicked', () => {
        beforeEach(() => wrapper.simulate('Click'));

        it('should call props.onClick', () => {
            expect(props.onClick).toHaveBeenCalled();
        });
    });
});
