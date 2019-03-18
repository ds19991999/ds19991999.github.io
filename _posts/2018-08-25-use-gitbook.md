---
title: ✍GitBook👉高级配置
date: 2018-08-25 23:29:08
updated: 2018-08-25 23:29:08
description: 介绍一下关于GitBook的高级配置
categories:
- 技术
tags:
- GitBook
- 技术
---

> 先留链接防丢失：
>
> 1. [gitbook-use](https://github.com/zhangjikai/gitbook-use/tree/master)
> 2. [使用GitBook打造自己的出版平台](https://blog.csdn.net/ds19991999/article/details/81275458)

## 安装💦

* NodeJS(v4.0.0及以上)
* `npm install gitbook-cli -g` ， `gitbook-cli`是gitbook的一个命令行工具, 通过它可以在电脑上安装和管理gitbook的多个版本.
* 预览书籍：
  * `gitbook serve` : 在书籍的文件夹中生成一个 `_book` 文件夹，里面的内容即为生成的 html 文件， 通过`http://localhost:4000/`可以预览书籍。
  * `gitbook build` : 仅生成 `_book` 里的html，不开启服务器。

## 常用命令💦

> 1. `gitbook-cli` 和 `gitbook` 是两个软件;
> 2. `gitbook-cli` 会将下载的 gitbook 的不同版本放到 `~/.gitbook`中, 可以通过设置`GITBOOK_DIR`环境变量来指定另外的文件夹.

* **生成静态网页**：`gitbook build`
* **生成静态网页并运行服务器**: `gitbook serve`
* **生成时指定gitbook的版本, 本地没有会先下载**: `gitbook build ----gitbook=2.6.7`
* **列出本地所有的gitbook版本**: `gitbook ls`
* **列出远程可用的gitbook版本**: `gitbook ls-remote`
* **更新到gitbook的最新版本**: `gitbook update`
* **卸载对应的gitbook版本**: `gitbook uninstall 2.6.7`

## 目录结构💦

```
.
├── book.json
├── README.md
├── SUMMARY.md
├── chapter-1/
|   ├── README.md
|   └── something.md
└── chapter-2/
    ├── README.md
    └── something.md
```

### Summary💦

**示例1：**以后会经常用到的

```
# Summary
* [Introduction](README.md)-------------------------------1.1
----
### [Part I](folder1/README.md)

* [Writing is nice](folder1/writing.md)-------------------2.1.
* [GitBook is nice](folder1/gitbook.md)-------------------2.2.

### Part II

* [We love feedback](folder2/feedback_please.md)----------3.1.
* [Better tools for authors](folder2/better_tools.md)-----3.2.

----

* [Last part without title](title.md)---------------------4.1.
```

**示例2：**以后会用的但不常用的

```
# Summary

### Part I(part1/README.md)---------------------------1.

* [section1](part1/section1/README.md)----------------1.1.
	* [Writing is nice](part1/section1/writing.md)----1.1.1
	* [GitBook is nice](part1/section1/gitbook.md)----1.1.2
* [We love feedback](part1/title1.md)-----------------1.2
* [Better tools for authors](part1/title2.md)---------1.3
```

**示例3**：最简版本

```
# Summary
### Part I
* [Introduction](README.md)
* [Writing is nice](writing.md)
* [GitBook is nice](gitbook.md)

### Part II

* [We love feedback](feedback_please.md)
* [Better tools for authors](better_tools.md)
```

### Glossary💦

 `GLOSSARY.md`。该文件主要存储词汇信息，如果在其他页面中出现了该文件中的词汇，鼠标放到词汇上会给出词汇示意。

 `GLOSSARY.md` 格式：

```
## Git-----------------词汇
分散式版本控制软件--------词汇示意

## Markdown
Aaron Swartz 跟John Gruber共同设计的排版语言
```

## book.json💦

`book.json` 最重要，故单独作为一节。

### title：设置书本的标题💦

```json
"title" : "Gitbook Use"
```

###  author：作者的相关信息💦

```
"author" : "ds"
```

###  description：本书的简单描述💦

```json
"description" : "记录Gitbook的配置和一些插件的使用"
```

###  language：Gitbook使用的语言💦

版本2.6.4中可选的语言如下：

```json
en, ar, bn, cs, de, en, es, fa, fi, fr, he, it, ja, ko, no, pl, pt, ro, ru, sv, uk, vi, zh-hans, zh-tw
```

配置使用简体中文:

```json
"language" : "zh-hans",
```

###  gitbook: 指定使用的gitbook版本💦

```json
"gitbook" : "3.2.2",
"gitbook" : ">=3.0.0"
```

###  root：指定根目录💦

```json
"root": "."
```

###  links：左侧导航栏添加链接信息💦

```json
"links" : {
    "sidebar" : {
        "个人主页" : "http://www.ds-vip.top"
    }
}
```

### styles：自定义页面样式💦

默认情况下各`generator`对应的`css`文件：

```json
"styles": {
    "website": "styles/website.css",
    "ebook": "styles/ebook.css",
    "pdf": "styles/pdf.css",
    "mobi": "styles/mobi.css",
    "epub": "styles/epub.css"
}
```

例如使`<h1> <h2>`标签有下边框， 可以在`website.css`中设置，这个可以有。

```css
h1 , h2{
    border-bottom: 1px solid #EFEAEA;
}
```

### plugins：配置使用的插件💦

```j&#39;so
"plugins": [
    "disqus"
]
```

* 例如上面添加`disqus`插件：之后需要运行`gitbook install`来安装新的插件。
* Gitbook默认带有5个插件：highlight、search、sharing、font-settings、livereload
* 如果要去除自带的插件， 可以在插件名称前面加`-`：

```json
"plugins": [
    "-search"
]
```

### pluginsConfig：配置插件的属性💦

```json
"pluginsConfig": {
    "fontsettings": {
        "theme": "sepia",
        "family": "serif",
        "size":  1
    }
}
```

上面就是配置Gitbook界面那个`A`按钮的默认属性。

### structure💦

指定 Readme、Summary、Glossary 和 Languages 对应的文件名，下面是这几个文件对应变量以及默认值：

| 变量                  | 含义和默认值                                   |
| --------------------- | ---------------------------------------------- |
| `structure.readme`    | `Readme file name (defaults to README.md)`     |
| `structure.summary`   | `Summary file name (defaults to SUMMARY.md)`   |
| `structure.glossary`  | `Glossary file name (defaults to GLOSSARY.md)` |
| `structure.languages` | `Languages file name (defaults to LANGS.md)`   |

## GitBook插件💦

可以指定插件的版本可以使用 `plugin@0.3.1` ， 下面的插件在 GitBook 的 `3.2.3` 版本中可以正常工作，[插件官网](https://plugins.gitbook.com/)。

具体介绍看这里：https://github.com/zhangjikai/gitbook-use/blob/master/plugins.md

* Summary插件：`npm install -g gitbook-summary`
* `book sm`，一个完整的目录文件`SUMMARY.md`就生成了 ，之后根据自己的需要修改，进一步的命令就不需要了。

## 主题💦

我们常用的就是 Book 文档模式，所以只看这部分。

### theme-default💦

默认的 Book 主题。将 `showLevel` 设为 `true`， 就可以显示标题前面的数字索引，默认不显示。 

```json
{
    "theme-default": {
        "showLevel": true
    }
}
```

###  theme-comscore💦

这个主题为标题添加了颜色

```json
{
"plugins": [
        "theme-comscore"
    ]
}
```

## book.json配置文件💦

* 👉[看这里](https://github.com/ds19991999/useful-file/blob/master/GitBook)

