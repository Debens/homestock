import axios from 'axios';

import { data } from '../stock/reducers';

export interface IAuthServiceParams {
    storage: Storage;
}

export interface IAuthService {
    login: (credentials: ICredentials) => Promise<ITokenResponse>;
    logout: (token: string) => Promise<void>;
    isLoggedIn: () => Promise<boolean>;
    accessToken: () => Promise<string | undefined>;
}

export interface ICredentials {
    username: string;
    password: string;
}

export interface ITokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: string;
    id: string;
}

const TOKEN_STORAGE_KEY = 'hs:auth:tokens';
const TOKEN_EXPIRY_KEY = 'hs:auth:expiry';

export class AuthService implements IAuthService {
    private storage: Storage;
    constructor({ storage }: IAuthServiceParams) {
        this.storage = storage;
    }

    login = async (credentials: ICredentials) => {
        const tokens = (await axios.post<ITokenResponse>(
            `${process.env.AUTHENTICATION_URL}/login`,
            {
                email: credentials.username,
                password: credentials.password,
            },
        )).data;

        var expiryDate = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + parseInt(tokens.expires_in, 10));

        this.storage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
        this.storage.setItem(TOKEN_EXPIRY_KEY, expiryDate.toISOString());

        return tokens;
    };

    logout = async (token: string) => {
        if (!this.isLoggedIn()) {
            return;
        }

        await axios.post(`${process.env.AUTHENTICATION_URL}/logout`, { token });

        this.storage.setItem(TOKEN_STORAGE_KEY, null);
        this.storage.setItem(TOKEN_EXPIRY_KEY, null);
    };

    isLoggedIn = async () => {
        try {
            const tokens: ITokenResponse = JSON.parse(
                this.storage.getItem(TOKEN_STORAGE_KEY),
            );
            const expiryDate = new Date(this.storage.getItem(TOKEN_EXPIRY_KEY));

            return !!tokens && !!tokens.access_token && expiryDate > new Date();
        } catch (e) {
            console.error(e);

            return false;
        }
    };

    accessToken = async () => {
        if (!this.isLoggedIn()) {
            return;
        }

        return (JSON.parse(this.storage.getItem(TOKEN_STORAGE_KEY)) as ITokenResponse)
            .access_token;
    };
}

export const authService = new AuthService({ storage: localStorage });

export default authService;
