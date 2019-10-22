const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 先留着
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');



process.env.NODE_ENV = 'production';

const baseWebpackConfig = require('./webpack.base.conf');

const devConf = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: { // 最小化生产 https://webpack.docschina.org/plugins/mini-css-extract-plugin/#install
        minimizer: [
            new TerserJSPlugin(), // 最小化js
            new OptimizeCSSAssetsPlugin({}) // 最小化css
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: "css/[id].css"
        }),
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
        })
    ]
});

module.exports = devConf;
// webpack(devConf);
