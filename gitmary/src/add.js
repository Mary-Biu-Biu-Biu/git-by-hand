// 用于写入文件
const fs = require('fs')
const constants = require('./constants')
const fileUtils = require('./utils/fileUtils')
const indexUtils = require('./utils/indexUtils')

// 添加文件到索引中(暂存区中)
// 方便追踪文件
module.exports.add = (filepath) => {
    // 获取该路径下的所有文件的路径
    let filePaths = fileUtils.allFilesUnderPath(filepath)

    // 并对所有文件创建索引（放入暂存区）
    if (filePaths.length > 0) {
        filePaths.forEach((path) => {
            indexUtils.updateIndex(path, 'add')
        })
    } else {
        throw new Error('invalid path: no files to add')
    }
}
