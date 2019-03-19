---
title: 解决阿里云Debian新机update问题
permalink: /posts/2019-03-19-fix-debian-update
description: 解决套路云Debian新机update的时候出现Waiting for headers和404错误
math: '0'
tags: 'linux, vps, 技术'
categories: '技术, linux'
date: '2019-03-19 13:44:00 +08:00'
updated: '2019-03-19 13:44:00 +08:00'
---
- 阿里云自带了一些无用的安全源，删除掉即可（ubuntu/debian系统）

```shell
rm -rf /root/.pip /root/.pydistutils.cfg /etc/apt/sources.list.d/sources-aliyun-0.list /etc/apt/sources.list.d/sources-aliyun* /var/lib/apt/lists/* 
```

- 根据[阿里云官方源](http://mirrors.aliyun.com/)的建议，修改源

```shell
deb http://mirrors.cloud.aliyuncs.com/debian/ jessie main contrib non-free
deb-src http://mirrors.cloud.aliyuncs.com/debian/ jessie main contrib non-free
deb http://mirrors.cloud.aliyuncs.com/debian/ jessie-proposed-updates main non-free contrib
deb-src http://mirrors.cloud.aliyuncs.com/debian/ jessie-proposed-updates main non-free contrib
deb http://mirrors.cloud.aliyuncs.com/debian/ jessie-updates main contrib non-free
deb-src http://mirrors.cloud.aliyuncs.com/debian/ jessie-updates main contrib non-free
 
## Uncomment the following two lines to add software from the 'backports'
## repository.
##
## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
#deb http://mirrors.cloud.aliyuncs.com/debian/ jessie-backports main contrib non-free
#deb-src http://mirrors.cloud.aliyuncs.com/debian/ jessie-backports main contrib non-free
```

- 更新镜像，搞定

```shell
apt-get clean
apt-get update
```

套路云还是套路云，服气！！！
