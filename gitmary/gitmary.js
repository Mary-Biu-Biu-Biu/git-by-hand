const init = require('./src/init').init
const add = require('./src/add').add
const rm = require('./src/rm').rm
const commit = require('./src/commit').commit
const branch = require('./src/branch').branch
module.exports = {
    init: init,
    add: add,
    rm: rm,
    commit: commit,
    branch: branch,
}
