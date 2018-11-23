import axios, { AxiosRequestConfig } from 'axios';

import { IAuthService } from '../../authentication/service';

export interface IRequestManager {
    get: <T>(url: string, options?: IRequestOptions) => Promise<T>;
}

export interface IRequestOptions extends AxiosRequestConfig {
    authenticated?: boolean;
}

const axiosConfig = async (
    auth: IAuthService,
    options?: IRequestOptions,
): Promise<AxiosRequestConfig> => {
    const { authenticated, ...axiosConfig } = options;

    if (authenticated) {
        axiosConfig.headers = {
            ...axiosConfig.headers,
            authorization: `Bearer ${await auth.accessToken()}`,
        };
    }

    return axiosConfig;
};

export const RequestManager = (auth: IAuthService): IRequestManager => ({
    get: async (url, options) =>
        (await axios.get(url, await axiosConfig(auth, options))).data,
});
