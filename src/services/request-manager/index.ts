import service from '../../authentication/service';
import { RequestManager } from './request-manager';

export const requestManager = RequestManager(service);

export default requestManager;
