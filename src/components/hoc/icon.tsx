import * as React from 'react';

import IconWrapper, { IIconWrapperProps } from '../IconWrapper/IconWrapper';

export const icon = (Icon: React.ComponentType) =>
    class WrappedIcon extends React.PureComponent<IIconWrapperProps> {
        render() {
            return (
                <IconWrapper {...this.props}>
                    <Icon />
                </IconWrapper>
            );
        }
    };

export default icon;
