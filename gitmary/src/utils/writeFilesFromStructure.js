// 用于创建文件结构
module.exports.writeFilesFromStructure = function (structure, prefix) {
    // 循环当前structure中所有的key
    Object.keys(structure).forEach((key) => {
        // 并把key添加到路径中
        let path = nodePath.join(prefix, key)

        // 如果当前key对应的元素是字符串，则说明key是文件
        if (util.isString(structure[key])) {
            fs.writeFileSync(path, structure[key])
        }
        // 否则当前key是文件夹（目录）
        else {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, '777')
            }

            files.writeFilesFromstructure(structure[key], path)
        }
    })
}
