import { createBrowserHistory } from 'history';

// base url must be either empty or lead with a slash (but no trailing slash) for a sub dir (ie /SOME_URL )
const BASE_URL =
    process.env.BASE_URL && process.env.BASE_URL !== '/' ? process.env.BASE_URL : '';

export default createBrowserHistory({ basename: BASE_URL });
