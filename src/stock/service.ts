import { List } from 'immutable';

import requestManager from '../services/request-manager/index';
import { IRequestManager } from '../services/request-manager/request-manager';
import { IStock } from '../state';

export interface IStockService {
    getAll(containerId: string): Promise<List<IStock>>;
}

export class StockService implements IStockService {
    constructor(private client: IRequestManager) {}

    getAll = async (containerId: string) =>
        List(
            await this.client.get<IStock[]>(
                `${process.env.CONTAINERS_URL}/${containerId}/stock`,
                {
                    authenticated: true,
                },
            ),
        );
}

export const stockService = new StockService(requestManager);

export default stockService;
