import classNames from 'classnames';
import * as React from 'react';

import EmptyPage from '../EmptyPage/EmptyPage';
import styles from './styles.scss';

export interface ICenteredPageProps {
    className?: string;
}

export class CenteredPage extends React.PureComponent<ICenteredPageProps> {
    render() {
        return (
            <EmptyPage className={classNames(styles.container, this.props.className)}>
                {this.props.children}
            </EmptyPage>
        );
    }
}

export default CenteredPage;
