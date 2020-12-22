// 用于创建文件/文件夹
const fs = require('fs')
const path = require('path')
const otherUtils = require('./otherUtils')
const objectUtils = require('./objectUtils')

// 用于创建文件结构
function writeFilesFromStructure(structure, prefix) {
    // 循环当前structure中所有的key
    Object.keys(structure).forEach((key) => {
        // 并把key添加到路径中
        let currentPath = path.join(prefix, key)

        // 如果当前key对应的元素是字符串，则说明key是文件
        // 则同步写入文件
        if (typeof structure[key] === 'string') {
            fs.writeFileSync(currentPath, structure[key])
        }

        // 否则当前key是文件夹（目录）
        else {
            // 检查文件是否已经存在，若不存在则创建该文件夹
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath, '777')
            }

            // 并开始创建该文件夹内部的文件夹+文件
            writeFilesFromStructure(structure[key], currentPath)
        }
    })
}

// 用于找到当前目录下的所有文件
function allFilesUnderPath(filepath) {
    // 存放所有文件路径的列表
    let result = []

    function recurCheck(filepath) {
        // 如果当前路径不存在，直接跳过
        if (!fs.existsSync(filepath)) {
            console.error("'" + filepath + "' is not a file")
            return
        }
        // 当前路径是文件，则放入列表中
        else if (fs.statSync(filepath).isFile()) {
            result.push(filepath)
            return
        }
        // 如果当前路径是文件夹，则迭代
        else if (fs.statSync(filepath).isDirectory()) {
            fs.readdirSync(filepath).forEach((item) => {
                recurCheck(path.join(filepath, item))
            })
        }
    }

    recurCheck(filepath)
    return result
}

// 转换基于gitmary的相对路径 -》 绝对路径
function getAbsolutePathFromGitMary(filepath = '') {
    return path.join(process.cwd(), '.gitmary', filepath)
}

// 转换：基于仓库根目录的相对路径 -》 绝对路径
function getAbsolutePathFromRoot(filepath = '') {
    return path.join(process.cwd(), filepath)
}

// 读取文件内容
function readFile(filepath) {
    // 检查文件地址是否有效
    if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
        // 返回文件内容
        return fs.readFileSync(filepath, 'utf8')
    }
    return ''
}

// 写入一个单独文件
function writeSingleFile(filepath, content) {
    // 把路径转换成structure结构
    let structure = otherUtils.pathToStructure(
        {},
        filepath.split(path.sep).concat(content)
    )

    // 传过来的filepath已经是绝对路径了，所以这里不需要添加前面的路径
    // 使用这个function是防止新文件的路径中有还没有创建的文件夹
    writeFilesFromStructure(structure, '/')
}

// 删除路径下所有文件
function deleteFiles(filePaths) {
    filePaths.forEach((filepath) => {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
        }
    })
}

// 根据diff获取的文件区分，更新目录
function updateFromDiff(diffs) {
    找到有变化的哪些文件
    let diffArr = Object.values(diffs)
    diffArr = diffArr.filter((item) => item.status !== 'SAME')
    diffArr.forEach((item) => {
        // 获取文件的绝对路径
        let filepath = getAbsolutePathFromRoot(item.path)
        // 新增或修改的文件，重写
        if (item.status === 'A' || item.status === 'M') {
            writeSingleFile(filepath, objectUtils.getContent(item.target))
        }
        // 删除的文件，删除
        else if (item.status === 'D') {
            fs.unlinkSync(filepath)
        }
    })
}

module.exports = {
    // 用于创建文件结构
    writeFilesFromStructure: writeFilesFromStructure,
    allFilesUnderPath: allFilesUnderPath,
    getAbsolutePathFromGitMary: getAbsolutePathFromGitMary,
    getAbsolutePathFromRoot: getAbsolutePathFromRoot,
    readFile: readFile,
    writeSingleFile: writeSingleFile,
    deleteFiles: deleteFiles,
    updateFromDiff: updateFromDiff,
}
