// 用于创建文件/文件夹
const fs = require('fs')
const path = require('path')

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
}

function writeSingleFile(filepath, content) {
    // 生成文档路径结构（适配writeFilesFromStructure）
    function createStructure(structure, array) {
        if (array.length === 2) {
            console.log(structure[1])
            structure[array[0]] = array[1]
        } else if (array.length > 2) {
            structure[array[0]] = structure[array[0]] || {}
            createStructure(structure[array[0]], array.slice(1))
        }
        return structure
    }
    let structure = createStructure(
        {},
        filepath.split(path.sep).concat(content)
    )

    // 传过来的filepath已经是绝对路径了，所以这里不需要添加前面的路径
    writeFilesFromStructure(structure, '/')
}

module.exports = {
    // 用于创建文件结构
    writeFilesFromStructure: writeFilesFromStructure,
    allFilesUnderPath: allFilesUnderPath,
    getAbsolutePathFromGitMary: getAbsolutePathFromGitMary,
    getAbsolutePathFromRoot: getAbsolutePathFromRoot,
    readFile: readFile,
    writeSingleFile: writeSingleFile,
}
