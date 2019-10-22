const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const dir = fs.readdirSync(path.join(__dirname));
console.log(__dirname);

console.log(dir);
webpack({
    entry: '../src/pages/index/index.js',
    output: {
        filename: '11.js',
        publicPath: '/  '
    },
})
