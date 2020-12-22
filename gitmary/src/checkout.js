const refUtils = require('./utils/refUtils')
const diffUtils = require('./utils/diffUtils')
const indexUtils = require('./utils/indexUtils')

const fileUtils = require('./utils/fileUtils')

// 切换commit或者切换分支（也是）
module.exports.checkout = (hash) => {
    // 获取对应branch的commit id（或者自己就是commit）
    let targetcommit = refUtils.getBranchLatestCommit(hash)

    // 把HEAD中指向的最新commit，和传入的目标commit对比存放的文件内容
    // 只要一个文件，在任意一个commit中有出现，就会进行对比
    let diffs = diffUtils.diff(
        refUtils.getBranchLatestCommit('HEAD'),
        targetcommit
    )

    // 根据这些不同，把受影响的文件进行更新
    fileUtils.rewriteFromDiff(diffs)

    // 更新HEAD文件中当前分支的最新commit
}
