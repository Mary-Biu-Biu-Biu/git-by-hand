const gitmary = require('../gitmary/gitmary')

/* test */
// gitmary.init()
// gitmary.add('fileToAdd.txt')
// gitmary.commit('first commit') // first

// gitmary.add('folderToAdd')
// gitmary.add('fileToRemove2.txt')
// gitmary.rm('fileToRemove2.txt')
// gitmary.commit('second commit') // second
// gitmary.add('folderToAdd2')
// gitmary.commit('third commit') // third
// gitmary.branch('new-branch')
// gitmary.add('2.txt')
// gitmary.commit('forth commit')
gitmary.checkout('52dab389')
gitmary.checkout('6a7064d')

// gitmary初始化已完成
// commit successfully, id:620b5202
// commit successfully, id:52dab389
// commit successfully, id:66f08bbe
// commit successfully, id:6a7064d

// ----------------index-----------({文件地址：hashid})
// {
//   'fileToAdd.txt': '1d321fc9',
//   'folderToAdd\\fileInFolder.txt': '0',
//   'fileToRemove2.txt': '5e36ee8c',
//   'folderToAdd2\\folderInsideFolder\\folderInsideFolderInsideFolder\\textFile.txt': '26d2c3dc'
// }

// ----------------tree-----------------
// {
//     'fileToAdd.txt': '1d321fc9',
//     folderToAdd: { 'fileInFolder.txt': '0' },
//     'fileToRemove2.txt': '5e36ee8c',
//     folderToAdd2: { folderInsideFolder: { folderInsideFolderInsideFolder: [Object] } }
// }

// -------------tree string--------------
// *folder* 435280cd folderToAdd （这里的435280cd：*file* 0 fileInFolder.txt）
// *file* 5e36ee8c fileToRemove2.txt
// *folder* 3599274b folderToAdd2 （这里的*folder* 3031fd2d folderInsideFolder）
// *file* 1d321fc9 fileToAdd.txt

// -------------tree hash-----------------
// 5b2ee60e

// ------------commit string--------------
// commit 5b2ee60e
// parent 51ad9a51
// Date:  Tue Dec 22 2020 16:34:13 GMT+0800 (GMT+08:00)
// message: first commit

// ------------commit hash-----------------
// 38e3535d
