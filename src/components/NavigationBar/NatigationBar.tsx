import classNames from 'classnames';
import * as React from 'react';

import LogoBeta from '../../resources/icons/logo-beta.svg';
import styles from './styles.scss';

export interface INavigationBarProps {
    className?: string;
}

export class NavigationBar extends React.PureComponent<INavigationBarProps> {
    render() {
        return (
            <div className={classNames([styles.container, this.props.className])}>
                <LogoBeta className={styles.logo} />
                <div className={styles.headerContainer}>
                    <span className={styles.header}>HOMESTOCK</span>
                </div>
            </div>
        );
    }
}

export default NavigationBar;
