const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const utils = require('./utils');
const pages = require('../config/pages');
const { generateTemplates } = require('../config/template');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        ...pages.getPagesEntry()
    },
    output: {
        filename: 'js/[name].js',
        path: resolve(process.env.NODE_ENV === 'development' ? 'dist' : 'prod'),
        publicPath: '/'
    },
    plugins: [
        ...generateTemplates()
    ],
    resolve: {
        extensions: ['.js', '.ts', 'tsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|doc?x|excel)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    fallback: require.resolve('file-loader'),
                    outputPath: 'img',
                    name(file) {
                        if (process.env.NODE_ENV === 'development') {
                            return '[path][name].[ext]';
                        }

                        return '[contenthash].[ext]';
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }

        ],
    },
};
