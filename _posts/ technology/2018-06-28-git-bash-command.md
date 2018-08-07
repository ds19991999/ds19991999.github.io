---
layout: post
music-id: 26092806
title: Git提交本地项目或文件
category: 技术
tag: [git, 2018]
keywords: git
description: git cmmand
---
## 一、基本命令
```
//建立本地仓库

//初始化本地仓库
$ git init

//添加到暂存区
$ git add .

//提交到工作区
$ git commit -m "first commit"

//添加远程Git仓库
$ git remote add origin https://github.com/ds19991999/VerCodeMFC.git

//删除远程Git仓库
$  git remote rm origin

//合并pull两个不同的项目解决fatal: refusing to merge unrelated histories
$ git pull origin master --allow-unrelated-histories

//使用强制push的方法：
$ git push -u origin master -f
```
## 二、常见问题汇总
### 1.出现邮箱限制
![enter description here](https://www.github.com/ds19991999/githubimg/raw/master/小书匠/git.jpg)

![enter description here](https://www.github.com/ds19991999/githubimg/raw/master/小书匠/git3.jpg "git3")

![enter description here](https://www.github.com/ds19991999/githubimg/raw/master/小书匠/git2.jpg "git2")