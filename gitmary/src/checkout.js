const refUtils = require('./utils/refUtils')
const diffUtils = require('./utils/diffUtils')
const indexUtils = require('./utils/indexUtils')
const fileUtils = require('./utils/fileUtils')
const objectUtils = require('./utils/objectUtils')
const fs = require('fs')

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
    fileUtils.updateFromDiff(diffs)

    // 如果是回到commit，则HEAD更新为当前commit
    if (objectUtils.existHash(hash)) {
        fs.writeFileSync(fileUtils.getAbsolutePathFromGitMary('HEAD'), hash)
    } else {
        // 如果是回到branch，则HEAD更新为当前branch的path
        refUtils.updateBranch('HEAD', refUtils.getBranchPath(hash))
    }
}
