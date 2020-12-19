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

module.exports = {
    createHash: createHash,
}
