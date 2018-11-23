import { AxiosError, AxiosResponse } from 'axios';

import { ErrorCodes } from './codes';

const DEFAULT_ERROR_MESSAGE = 'Oops! Something went wrong';

export interface IServerError {
    error: {
        code: ErrorCodes;
        message: string;
        details: object;
    };
}

export interface IMessageOptions {
    default?: string;
}

const getResponse = (error: any): IServerError | undefined => {
    if (error && error.response && error.response.data) {
        return error.response.data;
    }
};

export const errorService = {
    getCode: (error?: AxiosError) => {
        const response = getResponse(error);
        if (response && response.error && response.error.code) {
            return response.error.code;
        }

        return ErrorCodes.UnknownError;
    },
    getMessage: (error?: AxiosError, options?: IMessageOptions) => {
        const response = getResponse(error);

        if (response && response.error) {
            switch (response.error.code) {
                case ErrorCodes.UnknownError:
                    return DEFAULT_ERROR_MESSAGE;
                default:
                    return response.error.message;
            }
        }

        return options && options.default ? options.default : DEFAULT_ERROR_MESSAGE;
    },
};

export default errorService;
