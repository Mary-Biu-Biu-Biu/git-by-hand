const fileUtils = require('./utils/fileUtils')
const indexUtils = require('./utils/indexUtils')

// 提交
module.exports.commit = (option) => {
    // 把index对象转换为树
    const treeHash = gitdou.write_tree()

    // 基于hash的树，创建提交对象
    // create commit object based on the tree hash
    const parentHash = refs.getParentHash()
    const commitHash = objects.createCommit({ treeHash, parentHash, option })

    // console.log(`commitHash ${commitHash}`);
    // point the HEAD to commit hash
    // 更新refs的指向
    refs.updateRef({ updateToRef: 'HEAD', hash: commitHash })
}
