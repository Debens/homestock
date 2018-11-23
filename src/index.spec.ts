import './index';
import sagaExecutor from './sagas/index';
import { rootSaga } from './sagas/root-saga';

jest.mock('./sagas');
jest.mock('./sagas/root-saga', () => ({ rootSaga: jest.fn() }));

describe('Homestock Entry', () => {
    it('should start the sagas ', () => {
        expect(sagaExecutor.run).toHaveBeenCalledWith(rootSaga);
    });
});
