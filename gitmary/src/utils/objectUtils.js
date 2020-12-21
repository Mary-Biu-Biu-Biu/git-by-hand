const path = require('path')
const fs = require('fs')
const fileUtils = require('./fileUtils')
const otherUtils = require('./otherUtils')

function saveObject(content) {
    // 根据文本，计算出对应的hash
    const hash = otherUtils.createHash(content)

    // 获取objects目录中该hash的路径
    const objectPath = path.join(
        fileUtils.getAbsolutePathFromGitMary(),
        'objects',
        hash
    )

    // 在objects中创建该hash的文件，并把文本写入到hash文件中
    fs.writeFileSync(objectPath, content)

    // 返回创建好的hash
    return hash
}

function existHash(hash) {
    return fs.existsSync(
        path.join(fileUtils.getAbsolutePathFromGitMary(), 'objects', hash)
    )
}

module.exports = {
    saveObject: saveObject,
    existHash: existHash,
}
