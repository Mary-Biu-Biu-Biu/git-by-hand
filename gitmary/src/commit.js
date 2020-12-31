const fileUtils = require('./utils/fileUtils')
const indexUtils = require('./utils/indexUtils')
const refUtils = require('./utils/refUtils')
const objectUtils = require('./utils/objectUtils')
const otherUtils = require('./utils/otherUtils')
const path = require('path')

// 提交
module.exports.commit = (message) => {
    // 把index对象转换为树，即文件夹层级通过key来表示，比如：
    // {
    //     file1: 'hash1',
    //     path: {
    //         file2: 'hash2',
    //     },
    // }
    const index = indexUtils.getAllIndex(false)
    const tree = Object.keys(index).reduce(function (tree, wholePath) {
        return otherUtils.pathToStructure(
            tree,
            wholePath.split(path.sep).concat(index[wholePath])
        )
    }, {})

    function stringTree(tree) {
        var treeString =
            Object.keys(tree)
                .map(function (key) {
                    if (typeof tree[key] === 'string') {
                        return '*file* ' + tree[key] + ' ' + key
                    } else {
                        return '*folder* ' + stringTree(tree[key]) + ' ' + key
                    }
                })
                .join('\n') + '\n'

        return objectUtils.saveObject(treeString)
    }

    // 计算树的hash
    let treeHash = stringTree(tree)

    // 读取“HEAD”文件中当前的branch中记录的commit
    let lastCommit = [refUtils.getBranchLatestCommit('HEAD')]

    // 完整的commit记录
    let commitString =
        // commit和所有文件内容的hash
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
        // commit信息
        'message: ' +
        message +
        '\n'

    // 对commit进行hash，并把hash内容保存到objects中
    const commitHash = objectUtils.saveObject(commitString)

    // 更新refs的指向
    refUtils.updateBranch('HEAD', commitHash)
    console.log('commit successfully, id:' + commitHash)
}
