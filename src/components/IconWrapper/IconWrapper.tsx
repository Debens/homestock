import classNames from 'classnames';
import * as React from 'react';

import styles from './styles.scss';

export interface IIconWrapperProps {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
}

// See: https://ionicons.com/
export const IconWrapper: React.SFC<IIconWrapperProps> = ({
    className,
    onClick,
    children,
}) => (
    <div
        className={classNames(
            styles.container,
            {
                [styles.clickable]: !!onClick,
            },
            className,
        )}
        onClick={onClick}
    >
        {children}
    </div>
);

export default IconWrapper;
