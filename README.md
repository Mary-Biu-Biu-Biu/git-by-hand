# 用JavaScript实现简易的git（gitmary）
 implement gitmary(mini git) via JavaScript

## 实现的功能
精力有限，仅实现本地的主要功能，主要是帮助自己理解一下暂存区和版本控制的原理。远程和协同部分暂时没有完成。
### add
`gitmary.add('fileToAdd.txt')`：把目标文件添加到暂存区中。这里还可以传入一个相对路径，会把路径中所有文件添加到暂存区。

### branch
`gitmary.branch('new-branch')`：以当前的commit创建一个新的分支。

### checkout
`gitmary.checkout('6a7064d')`：切换到目标commit（通过commit id）的环境。这里也可以传入branch的名字，会更换到该branch的最新commit环境。

### commit
`gitmary.commit('first commit')`：提交当前修改并添加一段信息，并会返回一串commit id，比如`commit successfully, id:6a7064d`  

### init
`gitmary.init()`：在该路径下创建gitmary仓库。

### rm
`gitmary.rm('fileToRemove.txt')`：同时删除源文件和暂存区内该文件的记录。同add，这里可以输入一个路径，会和删除该路径下所有的文件。

## 文件结构
> ### gitmary  
>> └── src：实现gitmary的具体文件
>>> ├── add.js：添加文件到暂存区，或把路径下所有文件添加到暂存区
>>> ├── branch.js：创建新的分支  
>>> ├── checkout.js：切换到特定commit或者branch的最新commit状态  
>>> ├── commit.js：提交当前暂存区内的全部修改  
>>> ├── init.js：在目标路径下创建初始文件夹  
>>> ├── rm.js：删除暂存区记录和原始目标文件或路径下所有文件  
>>> └── utils  
>>>> ├── diffUtils.js：用于计算两个commit之间文件的差异  
>>>> ├── fileUtils.js：对文件的操作，如递归创建所有的文件夹+文件，根据diff结果更新所有仓库文件，获取路径下所有文件等。  
>>>> ├── indexUtils.js：用于对暂存区的处理  
>>>> ├── objectUtils.js：用于对hash和对应内容的管理  
>>>> └── otherUtils.js：用于git逻辑体系外的操作，比如计算hash  

>> └── gitmary.js：导出gitmary支持的功能，包括 init/add/rm/commit/branch/checkout  
> ### test  
>> ├── .gitmary：测试文件运行出来的仓库配置等文件  
>> └── test.js：用于执行测试的文件  