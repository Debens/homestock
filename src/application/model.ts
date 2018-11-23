import { AnyAction } from 'redux';

import { SnackbarStyle } from '../components/Snackbar/Snackbar';

export interface ISnackbarState {
    id: string;
    text: string;
    action?: AnyAction;
    actionText?: string;
    style?: SnackbarStyle;
}
