import classNames from 'classnames';
import * as React from 'react';

import styles from './styles.scss';

export interface IGutteredViewProps {
    className?: string;
}

export class GutteredView extends React.PureComponent<IGutteredViewProps> {
    render() {
        return (
            <div className={classNames(styles.container)}>
                <div className={classNames(styles.content, this.props.className)}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default GutteredView;
