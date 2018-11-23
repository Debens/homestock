import { List } from 'immutable';

import requestManager from '../services/request-manager/index';
import { IRequestManager } from '../services/request-manager/request-manager';
import { IContainer } from '../state';

export interface IContainerService {
    getAll(): Promise<List<IContainer>>;
}

export class ContainerService implements IContainerService {
    constructor(private client: IRequestManager) {}

    getAll = async () =>
        List(
            await this.client.get<IContainer[]>(process.env.CONTAINERS_URL, {
                authenticated: true,
            }),
        );
}

export const containerService = new ContainerService(requestManager);

export default containerService;
