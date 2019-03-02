# git

## git 文件

- 一个 tree 下面可能是 tree 也可能是 blob
- 一个 blob 对应一个文件

## 分离头指针

分离头指针没有和任何分支挂钩，可能回丢失信息

> 用处 可以在某个 commit 上进行修改，然后从此次 commit 上新建 branch，命令 git branch <branch> commit

## 变基 rebase

对分支信息进行修改

- git rebase -i <branch> 交互式修改

## 常用命令

- 加入缓存区 git add
- 提交 git commit -m 'your description'
- 不加入缓存区直接提交 git commit -am 'your description'

- 对最近一次 commit 的信息做变更 git commit --amend

- 创建分支 git branch <branch>
- 切换分支 git checkout <branch>
- 创建并且切换分支 git checkout -b <branch> <branch>/<commit> 可以基于某个分支或者提交

- 删除分支 git branch -d <branch>

- 文件名变更 git mv <source> <destination>

- 对历史 commit 的信息做变更 git rebase -i <branch> rename
- 合并多个连续历史 commit git rebase -i <branch> squash
