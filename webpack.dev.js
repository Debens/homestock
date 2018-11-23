const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: 'build',
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
    ],
});
