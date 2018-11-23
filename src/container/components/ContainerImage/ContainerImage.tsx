import classNames from 'classnames';
import * as React from 'react';

import image from '../../../resources/images/container-default.jpg';
import styles from './styles.scss';

export interface IContainerImageProps {
    className?: string;
}

export class ContainerImage extends React.PureComponent<IContainerImageProps> {
    render() {
        return (
            <div className={classNames([styles.container, this.props.className])}>
                <img className={styles.image} src={image} />
            </div>
        );
    }
}

export default ContainerImage;
