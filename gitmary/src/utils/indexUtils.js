const fileUtils = require('./fileUtils')
const path = require('path')
const fs = require('fs')
const objectUtils = require('./objectUtils')

function updateIndex(filepath, option) {
    switch (option) {
        case 'add':
            // 根据绝对路径，读取文本内容
            let content = fileUtils.readFile(
                fileUtils.getAbsolutePathFromRoot(filepath)
            )

            // 新文件的状态肯定是不会conflict的，因此创建没有conflict的index
            writeNonConflict(filepath, content)
            break

        default:
            throw new Error('invalid option')
    }
}

// 创建单独的文件路径（没有conflict意味着状态码=0）
function writeNonConflict(filepath, content) {
    // 删除当前文件所有可能的index
    deleteIndex(filepath)

    // 对文件创建状态=0的index
    writeIndexWithStatus(filepath, 0, content)
}

// 删掉目标文件的所有相关索引
function deleteIndex(filepath) {
    // 获取index文件中存储的全部index
    let index = getAllIndex()

    // 该文件可能有的状态码
    let status = [0, 1, 2, 3]

    // 删掉index中该文件对应的所有状态码的key+value
    status.forEach((state) => {
        delete index[filepath + ',' + state]
    })

    // 更新index文件内容
    writeToIndexFile(index)
}

// 根据状态码写入index
function writeIndexWithStatus(filepath, status, content) {
    // 获取当前index对象
    let index = getAllIndex()
    // 更新目标文件+状态的hash（同时更新obejcts中的内容）
    index[filepath + ',' + status] = objectUtils.saveObject(content)
    // 保存新的index到index文件
    writeToIndexFile(index)
}

// 把index文件中的内容作为一个JS对象返回
function getAllIndex() {
    // 获取.gitmary文件夹中的index文件
    var indexFilePath = path.join(
        fileUtils.getAbsolutePathFromGitMary(),
        'index'
    )

    // 把index中存储的文本内容，通过换行符转换成array
    let indexlines = textToLines(
        fs.existsSync(indexFilePath) ? fileUtils.readFile(indexFilePath) : '\n'
    )

    // 对每一行进行拆分，并构成index中的key+value
    return indexlines.reduce((index, line) => {
        var lineData = line.split(/ /)
        index[lineData[0] + ',' + lineData[1]] = lineData[2]
        return index
    }, {})
}

// 把文件中的文本转换成数组（通过换行划分元素）
function textToLines(str) {
    // 通过换行符划分为数组
    let lines = str.split('\n')

    // 过滤掉空行
    lines = lines.filter((line) => line !== '')
    return lines
}

// 把json格式的index转换文本，并写入index文件
function writeToIndexFile(index) {
    // 获取对象中所有的key
    let files = Object.keys(index)

    // 文件名 + 空格 + 状态 + 空格 + 内容
    // 并把每一个元素合并在一起，用换行符隔开
    let content =
        files
            .map((key) => {
                return (
                    key.split(',')[0] +
                    ' ' +
                    key.split(',')[1] +
                    ' ' +
                    index[key]
                )
            })
            .join('\n') + '\n'

    // 写入index文件中
    // fileUtils.writeSingleFile(
    //     path.join(fileUtils.getAbsolutePathFromGitMary(), 'index'),
    //     content
    // )
    fs.writeFileSync(
        path.join(fileUtils.getAbsolutePathFromGitMary(), 'index'),
        content
    )
}

module.exports = {
    // 用于创建文件结构
    textToLines: textToLines,
    getAllIndex: getAllIndex,
    writeToIndexFile: writeToIndexFile,
    deleteIndex: deleteIndex,
    updateIndex: updateIndex,
}
