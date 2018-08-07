# 为博客添加各种功能
* [ds19991999的博客](https://ds19991999.coding.me)

## 1.关于Jekyll本身插件的安装
一共三种方式:
* 在根目录下新建`_plugins`文件夹, 然后把对应的`*.rb`插件文件放进去就行了;
* 在`_config.yml`文件中增加一个`gems`关键字, 然后把要引用的插件用数组形式存储其中即可;
* 在Gemfile中添加相关的插件;

三种方法都可以, 甚至完全可以同时使用~

## 2.用kramdown自动生成目录树
* 启用`kramdown`，即在`_config.yml`中添加`markdown: kramdown`这一行
* 在md文章中需要插入目录的地方添加：
```
* 目录
{:toc}
```
第一行必须加！

## 3.添加标签归档页
* 直接在根目录下创建一个`tags.html`文件，主要是使用`site.tags`，具体代码如下：
```
---
layout: post
title: 标签
permalink: /tags/
---
<ul class="tags">
    {% for tag in site.tags %}
    <li>
        <a href="#{{ tag[0] }}">{{ tag[0] }}</a> <sup>{{ tag[1].size }}</sup>
    </li>
    {% endfor %}
</ul>

<ul class="listing">
    {% for tag in site.tags %}
    <li class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</li>
    {% for post in tag[1] %}
    <li class="listing-item">
        <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
        <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
    {% endfor %}
{% endfor %}
</ul>
```
* 将标签页以链接的形式嵌入`post.html`合适的位置，美观简洁即可.
## 4.添加日期归档页
* 与上面标签页完全一样，在根目录下创建`archives.html`文件，具体代码如下：
```
---
layout: post
permalink: /archives/
title: "归档"
---
<ul>
  {% for post in site.posts %}

    {% unless post.next %}
      <h2>{{ post.date | date: '%Y年' }}</h2>
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
        <h2>{{ post.date | date: '%Y年' }}</h2>
      {% endif %}
    {% endunless %}

    <li>{{ post.date | date:"%Y年%m月%d日：" }} <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
```
* 将`archives.html`以url的形式嵌入`post.html`中.

## 5.添加网易云音乐插件
* 在`include`目录下创建`cloud-music.html`，具体代码如下：
```
<!-- cloud music -->
<!-- auto=1 可以控制自动播放与否，当值为 1 即打开网页就自动播放，值为 0 时需要访客手动点击播放 -->
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86
        src="//music.163.com/outchain/player?type=2&id={{ page.music-id }}&auto=0&height=66">
</iframe>
```
* 将整个```cloud-music.html```嵌入`post.html`，具体位置可以放在正文开头:
```
  <!-- 在正文开头添加网易云音乐插件 -->
  {% if page.music-id %}
    {% include cloud-music.html %}
  {% endif %} 
  {{ content }}
```
* 在需要添加音乐的md文件开头的配置项添加`music-id: *****`，填写网易云`生成外链播放器`的曲目具体id.

## 6.添加站点访客数及文章浏览量
* 使用[不蒜子](http://ibruce.info/2015/04/04/busuanzi/#more)插件，在需要统计浏览量的页面引入busuanzi.js:
```
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js">
</script>
```
* 安装标签：
1. 显示站点总访问量
```
<!-- pv的方式，单个用户连续点击n篇文章，记录n次访问量 -->
<span id="busuanzi_container_site_pv">
    本站总访问量<span id="busuanzi_value_site_pv"></span>次
</span>
```
```
<!-- uv的方式，单个用户连续点击n篇文章，只记录1次访客数 -->
<span id="busuanzi_container_site_uv">
  本站访客数<span id="busuanzi_value_site_uv"></span>人次
</span>
```
2. 显示单页面访问量
```
<!-- pv的方式，单个用户点击1篇文章，本篇文章记录1次阅读量 -->
<span id="busuanzi_container_page_pv">
  本文总阅读量<span id="busuanzi_value_page_pv"></span>次
</span>
```
## 7.添加中英文字数统计
1. 英文字数统计
* jekyll中有内置的英文字数统计方法`number_of_words`，直接在需要显示的文章中添加代码`{{ page.content | number_of_words }}`，我是直接在`post.html`中添加，注意`{{ page.content | number_of_words }}`显示出来的只是字数，你需要加一些文字说明。
2. 中文字数统计
* 添加代码`{{ content | strip_html | strip_newlines | split: "" | size }}`，操作同上。

## 8.添加评论
使用[intensedebate](https://intensedebate.com/)，注册账号什么得不说了，将得到的html文件，即`intensedebate-comments.html`保存到`include`目录下，在`post.html`正文结束处添加：
```
  {% if site.intensedebate_comments %}
    {% include intensedebate-comments.html %}
  {% endif %} 
```

## 9.添加动态网站运行时间
* 直接将以下代码加入`_post`文件夹的html文件的合适位置，将`<span id="htmer_time" style="color: red;"></span>`放在你认为合适的地方显示网站运行时间.

```html
<!-- 计算网站运行时间 -->
<span style="font-size:12px;"><script language=JavaScript> 
 function secondToDate(second) {
     if (!second) {
        return 0;
     }
     
 var time = new Array(0, 0, 0, 0, 0);
     
 if (second >= 365 * 24 * 3600) {
     time[0] = parseInt(second / (365 * 24 * 3600));
     second %= 365 * 24 * 3600;
 }  
     
 if (second >= 24 * 3600) {
     time[1] = parseInt(second / (24 * 3600));
     second %= 24 * 3600;
 }
     
 if (second >= 3600) {
     time[2] = parseInt(second / 3600);
     second %= 3600;
 }
     
 if (second >= 60) {
     time[3] = parseInt(second / 60);
     second %= 60;
 }
     
 if (second > 0) {
     time[4] = second;
 }
    return time;
}
</script>
    
<!-- 动态显示网站运行时间 -->
<script type="text/javascript" language="javascript">
    function setTime() {
        var create_time = Math.round(new Date(Date.UTC(2018, 05, 05, 0, 0, 0)).getTime() / 1000);
        var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
        currentTime = secondToDate((timestamp - create_time));
        currentTimeHtml = '本站已安全运行' + currentTime[0] + '年' + currentTime[1] + '天' + currentTime[2] + '时' + currentTime[3] + '分' + currentTime[4] + '秒';
        document.getElementById("htmer_time").innerHTML = currentTimeHtml;
    }
    setInterval(setTime, 1000);
</script></span>
```

> 添加百度统计和Google分析以及站内搜索引擎，甚至自定义搜索引擎，以及更多细节操作见个人主页下的链接
