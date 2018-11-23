const webpack = require('webpack');
const HTML = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const Dotenv = require('webpack-dotenv-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const path = require('path');

const OUTPUT_DIR = 'build';

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        main: path.resolve(__dirname, 'src/index.ts'),
    },
    output: {
        filename: '[name].homstock.[hash:8].js',
        path: path.resolve(__dirname, OUTPUT_DIR),
        pathinfo: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
        modules: ['node_modules'],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: `resources/fonts/`,
                    },
                },
            },
            {
                test: /\.(ts|tsx)$/,
                loaders: [
                    'babel-loader',
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'typings-for-css-modules-loader', // Generates .d.ts files for the .css files
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            importLoaders: 1,
                            localIdentName:
                                '[folder]__[local]___[hash:base64:5]_[emoji:1]',
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true, // true outputs JSX tags
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanPlugin([OUTPUT_DIR]),
        new HTML({
            template: './public/index.ejs',
            filename: 'index.html',
        }),
        new Dotenv({
            path: './.env',
            sample: './.env.example',
        }),
        new webpack.EnvironmentPlugin([
            'AUTHENTICATION_URL',
            'USERS_URL',
            'CORE_URL',
            'MAX_ACCOUNT_AGE',
            'CONTAINERS_URL',
        ]),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, 'src/resources/icons/logo.svg'),
            injectHTML: true,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false,
            },
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new webpack.HashedModuleIdsPlugin(),
    ],
};
