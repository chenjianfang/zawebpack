const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = require('./pages');


exports.generateTemplates = (options) => {
    const entry = pages.getPagesEntry();
    return Object.entries(entry).map(([filename, pathname]) => {
        return new HtmlWebpackPlugin({
            filename: `${filename}.html`,
            template: path.join(__dirname, '../src/index.html')
        })
    });
}
