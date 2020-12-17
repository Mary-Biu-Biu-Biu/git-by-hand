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

module.exports = {
    // 用于创建文件结构
    writeFilesFromStructure: writeFilesFromStructure,
}
