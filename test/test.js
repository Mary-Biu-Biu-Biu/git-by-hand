const gitmary = require('../gitmary/gitmary')

// gitmary.init()
const fs = require('fs')
const path = require('path')
console.log(fs.readdirSync('.'))
console.log(path.join(process.cwd(), '.gitmary'))
