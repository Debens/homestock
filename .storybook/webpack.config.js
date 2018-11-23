const baseConfig = require('../webpack.dev.js');

module.exports = (storybookConfig, env, defaultConfig) => {
    let baseLoaders = storybookConfig.module.rules || [];
    let customLoaders = baseConfig.module.rules || [];
    storybookConfig.module.rules = baseLoaders.concat(customLoaders);

    Object.assign(storybookConfig.resolve, baseConfig.resolve);
    Object.assign(storybookConfig.entry, baseConfig.entry);
    return storybookConfig;
};
