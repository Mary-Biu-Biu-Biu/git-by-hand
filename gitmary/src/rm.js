const fileUtils = require('./utils/fileUtils')
const indexUtils = require('./utils/indexUtils')

// 删除路径中所有文件在index的记录
// (并不删除objects中存储的内容，方便误操作后的恢复)
module.exports.rm = (filepath) => {
    // 获取该路径下的所有文件的路径
    let filePaths = fileUtils.allFilesUnderPath(filepath)

    // 并对所有文件删除索引（移出暂存区）
    if (filePaths.length > 0) {
        filePaths.forEach((path) => {
            indexUtils.updateIndex(path, 'rm')
        })
    } else {
        throw new Error('invalid path: no file to remove')
    }

    // 删除本地文件
    fileUtils.deleteFiles(filePaths)
}
