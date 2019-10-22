const webpack = require('webpack');
const merge = require('webpack-merge');
const { CheckerPlugin } = require('awesome-typescript-loader')

process.env.NODE_ENV = 'development';

const baseWebpackConfig = require('./webpack.base.conf');

module.exports =
    merge(baseWebpackConfig, {
        devtool: 'cheap-module-eval-source-map',
        mode: 'development',
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ],
        },
        devServer: {
            contentBase: 'dist',
            hot: true,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                'process.env': require('../config/dev.env')
            })
        ]
    });
