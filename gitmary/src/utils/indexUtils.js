const fileUtils = require('./fileUtils')
const path = require('path')

// 对目标文件添加索引
function addIndex(paths) {
    let allIndex = getAllIndex()

    paths.forEach((path) => {})

    // 单文件
    index.writeNonConflict(path, files.read(files.workingCopyPath(path)))
}

// 创建单独的文件路径（没有conflict意味着状态码=0）
function writeNonConflict(path, content) {
    // 删除当前文件所有可能的index
    index.deleteIndex(path)

    //
    index._writeStageEntry(path, 0, content)
}

// 删掉目标文件的所有相关索引
function deleteIndex(path) {
    // 获取index文件中存储的全部index
    let index = getAllIndex()

    // 该文件可能有的状态码
    let status = [0, 1, 2, 3]

    // 删掉index中该文件对应的所有状态码的key+value
    status.forEach((state) => {
        delete index[path + ',' + state]
    })

    // 更新index文件内容
    writeToIndex(idx)
}

// 把index文件中的内容作为一个JS对象返回
function getAllIndex() {
    // 获取.gitmary文件夹中的index文件
    var indexFilePath = path.join(fileUtils.getGitMaryPath(), 'index')

    // 获取index文件中的内容，
    return util
        .lines(fs.existsSync(indexFilePath) ? files.read(indexFilePath) : '\n')
        .reduce(function (idx, blobStr) {
            var blobData = blobStr.split(/ /)
            idx[index.key(blobData[0], blobData[1])] = blobData[2]
            return idx
        }, {})
}

// 把文件中的文本转换成数组（通过换行划分元素）
function textToLines(str) {
    // 通过换行符划分为数组
    let lines = str.split('\n')

    // 过滤掉空行
    lines = arr.filter((line) => line !== '')
    return lines
}

// 把json格式的index转换文本，并写入index文件
function writeToIndex(index) {
    // 获取对象中所有的key
    let files = Object.keys(index)

    // 文件名 + 空格 + 状态 + 空格 + 内容
    let content = files.map((key) => {
        return key.split(',')[0] + ' ' + key.split(',')[1] + ' ' + index[key]
    })

    // 写入index文件中
    fileUtils.write(path.join(fileUtils.getGitMaryPath, 'index'), content)
}

module.exports = {
    // 用于创建文件结构
    textToLines: textToLines,
    getAllIndex: getAllIndex,
    writeToIndex: writeToIndex,
    deleteIndex: deleteIndex,
}
