const objectUtils = require('./objectUtils')

// 比较两个commit对应的文件区别
function diff(currentCommit, targetCommit) {
    // 从commit转换成index
    let targetIndex = objectUtils.commitToIndex(targetCommit)
    // 获取当前commit的index
    let currentIndex = objectUtils.commitToIndex(currentCommit)
    return indexDiff(currentIndex, targetIndex)
}

// 比较两个index对应的文件区别
function indexDiff(current, target) {
    // 把两边的路径去重
    const paths = Array.from(
        new Set([...Object.keys(target), ...Object.keys(current)])
    )

    // 对每个文件，对比两个commit中的hash，并给出状态
    return paths.reduce((diffs, path) => {
        diffs[path] = {
            status: getStatus(current[path], target[path]),
            path: path,
            target: target[path],
            current: current[path],
        }
        return diffs
    }, {})
}

function getStatus(current, target) {
    if (target === current) {
        return 'SAME'
    }
    if (!target && current) {
        return 'D'
    }
    if (target && !current) {
        return 'A'
    }
    if (target && current) {
        return 'M'
    }
}

module.exports = {
    diff: diff,
}
