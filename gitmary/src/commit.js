const fileUtils = require('./utils/fileUtils')
const indexUtils = require('./utils/indexUtils')
const refUtils = require('./utils/refUtils')
const objectUtils = require('./utils/objectUtils')
const otherUtils = require('./utils/otherUtils')
const path = require('path')

// 提交
module.exports.commit = (message) => {
    // 把index对象转换为树，即文件夹层级通过key来表示
    const index = indexUtils.getAllIndex(false)
    const tree = Object.keys(index).reduce(function (tree, wholePath) {
        return otherUtils.pathToStructure(
            tree,
            wholePath.split(path.sep).concat(index[wholePath])
        )
    }, {})
    console.log(tree)

    function stringTree(tree) {
        var treeString =
            Object.keys(tree)
                .map(function (key) {
                    if (typeof tree[key] === 'string') {
                        return 'blob ' + tree[key] + ' ' + key
                    } else {
                        return 'tree ' + stringTree(tree[key]) + ' ' + key
                    }
                })
                .join('\n') + '\n'

        return treeString
    }

    // 转换成string
    let treeString = stringTree(tree)
    console.log(treeString)
    // 计算树的hash
    const treeHash = objectUtils.saveObject(treeString)
    console.log(treeHash)

    // 读取“HEAD”文件中当前的branch中记录的commit
    let lastCommit = [refUtils.getBranchLatestCommit('HEAD')]

    // 完整的commit记录
    let commitString =
        // commit和对应hash id
        'commit ' +
        treeHash +
        '\n' +
        // 上一次commit的id
        lastCommit
            .map(function (h) {
                return 'parent ' + h + '\n'
            })
            .join('') +
        // 当前commit时间
        'Date:  ' +
        new Date().toString() +
        '\n' +
        '\n' +
        // commit信息
        '    ' +
        message +
        '\n'

    console.log(commitString)
    // 对commit进行hash，并把hash内容保存到objects中
    const commitHash = objectUtils.saveObject(commitString)

    // 更新refs的指向
    refUtils.updateBranch('HEAD', commitHash)
}
