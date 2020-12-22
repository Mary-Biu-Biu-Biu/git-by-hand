const path = require('path')
const fs = require('fs')
const fileUtils = require('./fileUtils')
const fileUtils2 = require('./fileUtils2')
const otherUtils = require('./otherUtils')

function saveObject(content) {
    // 根据文本，计算出对应的hash
    const hash = otherUtils.createHash(content)

    // 获取objects目录中该hash的路径
    const objectPath = path.join(
        fileUtils2.getAbsolutePathFromGitMary('objects'),
        hash
    )

    // 在objects中创建该hash的文件，并把文本写入到hash文件中
    fs.writeFileSync(objectPath, content)

    // 返回创建好的hash
    return hash
}

// 检查objects中是否存在目标hash对应的内容
function existHash(hash) {
    return fs.existsSync(
        path.join(fileUtils2.getAbsolutePathFromGitMary('objects'), hash)
    )
}

// 根据hash，获取objects中存储对应的原文
function getContent(hash) {
    let hashpath = path.join(
        fileUtils2.getAbsolutePathFromGitMary('objects'),
        hash
    )
    return fileUtils2.readFile(hashpath)
}

// 把commit转换成原文
function commitToIndex(hash) {
    // 获取commit原文
    let commitString = getContent(hash)

    // 获取该commit的文件信息hash id
    let treeHash = commitString.split('\n')[0].split(' ')[1]

    // 把文件树hash转换回成文件树的结构
    let tree = hashToStructure(treeHash, {})

    // 转换为index格式
    const index = treeToIndex(tree, {}, '')
    return index
}

// 仅该文件中使用，用于把文件树的hash转换为文件树
function hashToStructure(treeHash, tree) {
    let lines = getContent(treeHash)
        .split('\n')
        .filter((line) => line !== '')
    lines.forEach((line) => {
        const [type, hash, path] = line.split(' ')
        if (type === '*file*') {
            tree[path] = hash
        } else {
            tree[path] = {}
            hashToStructure(hash, tree[path])
        }
    })

    return tree
}

// 仅该文件中使用，用于把文件树转换为index读取出来的格式
function treeToIndex(tree, index, prefix) {
    Object.keys(tree).forEach((key) => {
        const filepath = path.join(prefix, key)
        if (typeof tree[key] === 'string') {
            index[filepath] = tree[key]
        } else {
            return treeToIndex(tree[key], index, filepath)
        }
    })
    return index
}

module.exports = {
    saveObject: saveObject,
    existHash: existHash,
    getContent: getContent,
    commitToIndex: commitToIndex,
}
