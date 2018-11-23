import classNames from 'classnames';
import * as React from 'react';

import styles from './styles.scss';

export interface ISpinnerProps {
    className?: string;
}

export const Spinner: React.SFC<ISpinnerProps> = ({ className }) => (
    <div className={classNames(styles.spinner, className)}>
        <svg
            className={styles.spinnerComponent}
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                cx={33}
                cy={33}
                r={28}
            />
        </svg>
        <svg
            className={styles.spinnerComponent}
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                cx={33}
                cy={33}
                r={28}
            />
        </svg>
        <svg
            className={styles.spinnerComponent}
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                cx={33}
                cy={33}
                r={28}
            />
        </svg>
        <svg
            className={styles.spinnerComponent}
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                cx={33}
                cy={33}
                r={28}
            />
        </svg>
    </div>
);

export default Spinner;
