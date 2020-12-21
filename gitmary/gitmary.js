const init = require('./src/init').init
const add = require('./src/add').add
const rm = require('./src/rm').rm
const commit = require('./src/commit').commit
module.exports = { init: init, add: add, rm: rm, commit: commit }
