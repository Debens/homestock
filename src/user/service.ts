import axios from 'axios';
import { format } from 'fecha';

import { ITokenResponse } from '../authentication/service';
import { requestManager } from '../services/request-manager/index';
import { IUser } from '../state';

export type IUserInfo = Omit<IUser, 'id' | 'created'>;

export interface ICreateUserParams extends IUserInfo {
    password: string;
}

export interface IUserService {
    create: (user: ICreateUserParams) => Promise<ITokenResponse>;
    get: () => Promise<IUser>;
}

export const UserService = (): IUserService => ({
    create: async (user: ICreateUserParams) =>
        (await axios.post<ITokenResponse>(process.env.USERS_URL, {
            ...user,
            birthday: format(new Date(user.birthday), 'YYYY-MM-DD'),
        })).data,
    get: async () =>
        await requestManager.get<IUser>(`${process.env.USERS_URL}`, {
            authenticated: true,
        }),
});

export default UserService();
