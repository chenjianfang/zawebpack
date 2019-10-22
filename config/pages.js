/**
 * 多页入口配置
 */

const path = require('path');
const fs = require('fs');


const entryDir = path.join(__dirname, '../src/pages');

/**
 * 获取所有入口文件夹   规则：js文件名和父级文件名相同
 * @param dir
 * @returns {Array}
 */
const getPages = (dir) => {
    const files = fs.readdirSync(dir);
    let entryLists = {};
    files.forEach((item) => {
        if (['components', 'css', 'js', 'src', 'common', 'img'].includes(item)) return; // 指定文件夹直接跳过
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            // 文件夹
            // 和文件夹同名入口文件
            path.extname('index.html');

            let entryFile = '';
            const asEntryName = ['.tsx', '.ts'].map((extname) => path.join(dir, item, `${item}${extname}`)).some((entryName) => {
                const isExistFile = fs.existsSync(entryName);
                if (isExistFile) entryFile = entryName;
                return isExistFile;
            });
            if (asEntryName) {
                const pathRelative = path.relative(entryDir, entryFile);
                let filename = path.win32.dirname(pathRelative);
                filename = filename.replace(/\\/g, '_'); // 文件名当有多级目录，以下划线分割
                entryLists = {
                    ...entryLists,
                    [filename]: entryFile
                };
            }
            const childEntry = getPages(fullPath);
            entryLists = {
                ...entryLists,
                ...childEntry
            }
        }
    });
    return entryLists;
};

/**
 * 返回入口文件
 */
exports.entryMap = {};

exports.getPagesEntry = () => {
    if (!Object.keys(exports.entryMap).length) {
        exports.entryMap = getPages(entryDir);
    }
    return exports.entryMap;
};
