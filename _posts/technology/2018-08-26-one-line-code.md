---
title: ✍神奇的一行代码
date: 2018-08-26 23:29:08
updated: 2018-08-26 23:29:08
description: 介绍基于Google浏览器的文本编辑器最简版本
categories:
- 技术
- html
- technology
tags:
- interesting
- 技术
- 娱乐
- technology
---

> 源于 Jose 在CoderWall 分享的一个[小技巧](https://coderwall.com/p/lhsrcq/one-line-browser-notepad)：在浏览器地址栏中输入下面这行代码:`data:text/html, <html contenteditable>`，回车即可把浏览器变临时编辑器，于是短短1小时被演绎成各种版本。

## 现在能用的😴`ace.js`源

```diff
+ http://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js
+ http://cdn.bootcss.com/ace/1.2.3/ace.js
- http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js
```

## 最初的版本：

```html
data:text/html, <html contenteditable>
```

## 加了标题

```html
data:text/html, <title>Text Editor</title><body contenteditable style="font-size:2rem;line-height:1.4;max-width:60rem;margin:0 auto;padding:4rem;">
```

## 加了文本标题

```h&#39;t
data:text/html;charset=utf-8, <title>TextEditor</title><body contenteditable style="font-size:2rem;font-family:monaco;line-height:1.4;max-width:60rem;margin:0 auto;padding:4rem;" spellcheck="false"><h1>Text Editor</h1><p>Start Here.
```



## 自动切换😍背景颜色

```html
data:text/html, <html><head><link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'><style type="text/css"> html { font-family: "Open Sans" } * { -webkit-transition: all linear 1s; }</style><script>window.onload=function(){var e=false;var t=0;setInterval(function(){if(!e){t=Math.round(Math.max(0,t-Math.max(t/3,1)))}var n=(255-t*2).toString(16);document.body.style.backgroundColor="#ff"+n+""+n},1e3);var n=null;document.onkeydown=function(){t=Math.min(128,t+2);e=true;clearTimeout(n);n=setTimeout(function(){e=false},1500)}}</script></head><body contenteditable style="font-size:2rem;line-height:1.4;max-width:60rem;margin:0 auto;padding:4rem;">
```

## 文本编辑器

```html
data:text/html, <html contenteditable><style>body{font-family:helvetica;font-size:15px;line-height:22px;color:#666;width:600px;margin:40px auto;background:#FFF;border:1px solid #DADADA;padding:50px; }</style>
```

## 改变了背景

```html
data:text/html, <html><head><meta charset="utf-8"><title>TextEditorLocal</title><script>window.onload=function(){f1()}; 
function f1(){a=window.localStorage['e'];if(a) document.body.innerHTML=a};function f2(t,e){if(e.keyCode==13){window.localStorage['e']=t.innerHTML}}</script>
<body contenteditable style="font-size:2rem;line-height:1.4;max-width:60rem;margin:0 auto;padding:4rem;word-wrap:break-word;background:black;color:green;" spellcheck="false" onkeypress="f2(this,event);"></body></html>
```



## 有保存按钮

```html
data:text/html,<button onClick="SaveTextArea()">Save</button> <script language="javascript" type="text/javascript"> function SaveTextArea() { window.location = "data:application/octet-stream," + escape(txtBody.value); } </script> <textarea id="txtBody" style="font-size: 1.5em; width: 100%; height: 100%; boarder: none; outline: none" autofocus> </textarea>
```



## html预览

```html
data:text/html,<pre onkeyup="(function(d,t){d[t]('iframe')[0].contentDocument.body.innerHTML = d[t]('pre')[0].textContent;})(document,'getElementsByTagName')" style="width:100%;height:48%;white-space:pre-wrap;overflow:auto;" contenteditable></pre><iframe style="width:100%;height:48%">
```

## 笔记本样式

```html
data:text/html;charset=utf-8, <title>TextEditor</title>
       
<style>
body {
        background: -webkit-linear-gradient(#f0f0f0, #fff);
        padding: 3%;
        height: 94%;
       
}
 
.paper {
        font: normal 14px "Lucida Grande", arial, sans-serif;
        width: 50%;
        height: 80%;
        margin: 0 auto;
        padding: 6px 5px 4px 42px;
        position: relative;
        color: #444;
        line-height: 20px;
        border: 1px solid #d2d2d2;
        background: #fff;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
        background: -webkit-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
        background: -moz-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
        background: -ms-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
        background: -o-linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
        background: linear-gradient(top, #d9eaf3 0%, #fff 8%) 0 4px;
        -webkit-background-size: 100% 20px;
        -moz-background-size: 100% 20px;
        -ms-background-size: 100% 20px;
        -o-background-size: 100% 20px;
        background-size: 100% 20px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.07);
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.07);
        box-shadow: 0 1px 2px rgba(0,0,0,0.07);
}
 
.paper::before {
        content: '';
        position: absolute;
        width: 4px;
        top: 0;
        left: 30px;
        bottom: 0;
        border: 1px solid;
        border-color: transparent #efe4e4;
}
 
textarea {
        display: block;
        width:94%;
        margin:0 auto;
        padding:3.8% 3%;
        border: none;
        outline: none;
        height: 94%;
        background: transparent;
        line-height: 20px;
}"><h1>Text Editor</h1>
</style>
 
<link rel="shortcut icon" href="http://g.etfv.co/https://docs.google.com"/>
 
<body OnLoad='document.body.focus();' contenteditable spellcheck="true" class="paper" >
```



## Ruby😍高亮

```html
data:text/html, <style type="text/css">#e{position:absolute;top:0;right:0;bottom:0;left:0;}</style><div id="e"></div><script src="http://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js" type="text/javascript" charset="utf-8"></script><script>var e=ace.edit("e");e.setTheme("ace/theme/monokai");e.getSession().setMode("ace/mode/ruby");</script>
```

## 另一种html编辑器带预览

```html
<!DOCTYPE html>
<html>
<head>
	<!-- 自动变色 -->
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<style type="text/css"> html { font-family: "Open Sans" } * { -webkit-transition: all linear 1s; }</style>
	<script>
		window.onload=function(){var e=false;var t=0;setInterval(function(){if(!e){t=Math.round(Math.max(0,t-Math.max(t/3,1)))}var n=(255-t*2).toString(16);document.body.style.backgroundColor="#ff"+n+""+n},1e3);var n=null;document.onkeydown=function(){t=Math.min(128,t+2);e=true;clearTimeout(n);n=setTimeout(function(){e=false},1500)}}
	</script>
</head>
    <body>
        <textarea rows="10" cols="35" id="inputdata" style="resize: auto;margin: 0px;height: 500px;width: 370px;">在此输入html...</textarea>
        <button id="rundata" onclick="rundata()">RUN</button>
        <iframe id="iframe1" style="resize: auto;margin: 0px;height: 500px;width: 370px;"></iframe>  
    </body>
        <script type="text/javascript">
            function rundata(){
                //获取输入框内的数据
                var text = document.getElementById('inputdata').value;
                // 先清空iframe
                var iframe = document.getElementById("iframe1").contentWindow.document.body.innerText = "";
                //将输入框内的数据传给iframe
                iframe = document.getElementById('iframe1').contentDocument.write(text);
               }
        </script>
</html>
```

* 技术造福人类🦉🦉🦉🦉🦉🦉