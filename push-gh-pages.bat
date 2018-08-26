@echo off
cd ./
echo "准备初始化仓库..."
git init
echo "准备初始化仓库...OK"

echo "添加远程仓库..."
git remote add origin https://github.com/ds19991999/ds19991999.github.io.git
echo "添加远程仓库...OK"

echo "开始提交本地文件..."
git add . 
git commit -m "auto commit"
echo "开始提交本地文件...OK"

echo "新建并切换本地分支..."
git branch style
git checkout style
echo "新建并切换本地分支...OK"

echo "最后强制push..."
git push -u origin style -f
echo "最后强制push...OK"
pause