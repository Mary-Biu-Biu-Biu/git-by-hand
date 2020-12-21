function createHash(string) {
    let hashInt = 0
    // 循环字符
    for (var i = 0; i < string.length; i++) {
        hashInt = hashInt * 31 + string.charCodeAt(i)
        // “|” 是位运算操作符。
        hashInt = hashInt | 0
    }

    return Math.abs(hashInt).toString(16)
}

// 根据路径，生成文档路径结构（适配writeFilesFromStructure）
function pathToStructure(structure, array) {
    if (array.length === 2) {
        console.log(structure[1])
        structure[array[0]] = array[1]
    } else if (array.length > 2) {
        structure[array[0]] = structure[array[0]] || {}
        createStructure(structure[array[0]], array.slice(1))
    }
    return structure
}

module.exports = {
    createHash: createHash,
    pathToStructure: pathToStructure,
}
