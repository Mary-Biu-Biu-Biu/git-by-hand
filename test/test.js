const gitmary = require('../gitmary/gitmary')

// test
gitmary.init()
gitmary.add('fileToAdd.txt')
gitmary.add('folderToAdd')
gitmary.add('fileToRemove2.txt')
// gitmary.rm('fileToRemove2.txt')

gitmary.commit('first commit')
