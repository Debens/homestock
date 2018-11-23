// polyfill requestAnimationFrame since jsdom doesn't provide it yet
// TODO - attempt enabling mock version instead via `new JSDOM(``, { pretendToBeVisual: true })`
require('raf').polyfill(global);

// jsdom doesn't have Fetch API
global.fetch = require('isomorphic-fetch');
