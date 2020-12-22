const refUtils = require('./utils/refUtils')

// 创建新分支
module.exports.branch = (branchname) => {
    // 检查空格
    if (branchname.includes(' ')) {
        throw new Error('branch名字不可以包含空格')
    }

    // 获取当前最新的commit
    let commit = refUtils.getBranchLatestCommit('HEAD')
    // 创建新的branch文件，并写入该commit
    refUtils.updateBranch(branchname, commit)
}
