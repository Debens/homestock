import classNames from 'classnames';
import * as React from 'react';

import NavigationBar from '../../NavigationBar/NatigationBar';
import styles from './styles.scss';

export interface IEmptyPageProps {
    className?: string;
}

export class EmptyPage extends React.PureComponent<IEmptyPageProps> {
    render() {
        return (
            <>
                <NavigationBar />
                <div className={classNames(styles.container, this.props.className)}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default EmptyPage;
