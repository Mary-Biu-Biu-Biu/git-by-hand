// 用于写入文件
const fs = require('fs')
const path = require('path')
const constants = require('./constants')

// 用于初始化一个git仓库
// =》 在当前文件夹中生成git项目的文件夹沟
function init() {
    // 检查初始化文件夹是否已经存在
    fs.stat(constants.gitmary, function (error, stats) {
        if (!error && stats.isDirectory()) {
            console.error('该文件夹已经是一个gitmary仓库了')
            return false
        }
    })

    fs.mkdir(constants.gitmary + '/objects', () => {})
    const structure = {
        // 文件：指向用于记录当前分支的文件地址（里面存放最近一次该分支的提交）
        // =》此时初始化为默认的master分支
        HEAD: 'ref: refs/heads/master',

        // 文件夹：存放仓库中所有数据内容
        objects: {},

        // 文件夹：存放所有git对象
        refs: {
            // 文件：存放目前的所有分支+对应分支最近一次提交
            heads: {},
        },

        // 文件：该仓库的配置文件，这里需要把json的配置信息转换成text格式
        // =》 这里的bare指的是不需要建立一个裸仓库（裸仓库指项目文件全部放在根目录，而不存放在.git文件夹中）
        config: JSON.stringify({ core: { bare: false } }, null, 4),
    }

    // files.writeFilesFromTree({ '.gitmary': structure }, process.cwd())
}

module.exports.init = init
