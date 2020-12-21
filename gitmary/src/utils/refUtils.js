const fileUtils = require('./fileUtils')
const path = require('path')
const fs = require('fs')
const otherUtils = require('./otherUtils')

// 更新分支中的最新commit id（即，引用）
// 注意：没有打算完成log功能，所以不会在logs中记录每个分支的全部commit记录
function updateBranch({ updateToRef, hash }) {
    // 获取该分支引用(ref)记录文件所在的相对路径
    const ref = getBranchPath(updateToRef)

    // 更新该ref（分支）中所记录的内容
    writeBranchFile(ref, hash)
}

// 获取分支记录文件的相对路径
function getBranchPath(ref) {
    // 如果是HEAD，则获取HEAD文件中记录的地址
    if (ref === 'HEAD') {
        const head = fs.readFileSync(
            path.join(fileUtils.getAbsolutePathFromGitMary, 'HEAD'),
            'utf8'
        )
        return head.replace('ref: ', '')
    }
    // 如果传进来的已经是有效的相对路径（refs/heads/branch名字）了，则直接返回即可
    else if (isValidBranchPath(ref)) {
        return ref
    }
    // 否则，添加prefix，转换为正确的相对路径格式
    else {
        return `refs/heads/${ref}`
    }
}

// 检测是否是正确有效的branch引用相对路径
function isValidBranchPath(ref) {
    return (
        ref !== undefined &&
        (ref.match('^refs/heads/[A-Za-z-]+$') ||
            ref.match('^refs/remotes/[A-Za-z-]+/[A-Za-z-]+$') ||
            ['HEAD', 'FETCH_HEAD', 'MERGE_HEAD'].indexOf(ref) !== -1)
    )
}

// 重写该branch的引用文件记录
function writeBranchFile(path, content) {
    // 把该ref文件路径+文本内容转换为structure结构
    const structure = otherUtils.pathToStructure(
        {},
        path.split('/').concat(content)
    )
    // 并在路径中写入内容
    fileUtils.writeFilesFromStructure(
        structure,
        fileUtils.getAbsolutePathFromGitMary()
    )
}

module.exports = {
    updateBranch: updateBranch,
    getBranchPath: getBranchPath,
    isValidBranchPath: isValidBranchPath,
    writeBranchFile: writeBranchFile,
}
