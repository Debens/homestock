import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';

import { IAppState } from '../../state';
import SnackbarArray, { ISnackbarArrayDispatchProps, ISnackbarArrayOwnProps, ISnackbarArrayStateProps } from '../components/SnackbarArray/SnackbarArray';
import application from '../index';

const mapStateToProps: MapStateToProps<
    ISnackbarArrayStateProps,
    ISnackbarArrayOwnProps,
    IAppState
    > = state => ({
        snackbars: application.selectors.snackbars(state),
    });

const mapDispatchToProps: MapDispatchToProps<
    ISnackbarArrayDispatchProps,
    ISnackbarArrayOwnProps
    > = dispatch => ({
        onAction: (id: string, action: AnyAction) => {
            dispatch(application.actions.hideSnackbar(id));

            dispatch(action);
        },
        onClick: (id: string) => dispatch(application.actions.hideSnackbar(id)),
    });

export const SnackbarArrayContainer = connect<
    ISnackbarArrayStateProps,
    ISnackbarArrayDispatchProps,
    ISnackbarArrayOwnProps,
    IAppState
    >(mapStateToProps, mapDispatchToProps)(SnackbarArray);

export default SnackbarArrayContainer;
