import sagaExecutor from './sagas/index';
import { rootSaga } from './sagas/root-saga';

sagaExecutor.run(rootSaga);

if (window && window.navigator && 'serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
        window.navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
