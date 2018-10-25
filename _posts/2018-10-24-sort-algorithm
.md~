```
title: 专题：排序算法
date: 2018-10-24 23:29:08
updated: 2018-10-24 23:29:08
description: 排序算法总结
categories:
- algorithm
tags:
- algorithm
- 计算机基础
math: 1
```
## 1、排序分类

* 插入排序
  * 直接插入排序
  * 折半插入排序
  * 希尔排序

* 选择排序
  * 简单选择排序
  * 堆排序
* 交换排序
  * 冒泡排序
  * 快速排序
* 其他排序
  * 二路归并排序
  * 基数排序
  * 外部排序
  * ...

<table>
<thead><tr>
<th>算法</th>
<th>平均</th>
<th>最好</th>
<th>最坏</th>
<th>空间</th>
<th>稳定性</th>
</tr></thead>
<tbody>
<tr>
<td>冒泡排序</td>
<td>O(N^2)</td>
<td>O(N)</td>
<td>O(N^2)</td>
<td>O(1)</td>
<td>稳定</td>
</tr>
<tr>
<td>直接插入排序</td>
<td>O(N^2)</td>
<td>O(N)</td>
<td>O(N^2)</td>
<td>O(1)</td>
<td>稳定</td>
</tr>
<tr>
<td>折半插入排序</td>
<td>O(NlogN)</td>
<td>O(NlogN)</td>
<td>O(N^2)</td>
<td>O(1)</td>
<td>稳定</td>
</tr>
<tr>
<td>简单选择排序</td>
<td>O(N^2)</td>
<td>O(N^2)</td>
<td>O(N^2)</td>
<td>O(1)</td>
<td>不稳定</td>
</tr>
<tr>
<td>快速排序</td>
<td>O(NlogN)</td>
<td>O(NlogN)</td>
<td>O(N^2)</td>
<td>O(logN)~O(N^2)</td>
<td>不稳定</td>
</tr>
<tr>
<td>希尔排序</td>
<td>O(NlogN)</td>
<td> </td>
<td>O(n^s)</td>
<td>O(1)</td>
<td>不稳定</td>
</tr>
<tr>
<td>归并排序</td>
<td>O(NlogN)</td>
<td>O(NlogN)</td>
<td>O(NlogN)</td>
<td>O(N)</td>
<td>稳定</td>
</tr>
<tr>
<td>堆排序</td>
<td>O(NlogN)</td>
<td>O(NlogN)</td>
<td>O(NlogN)</td>
<td>O(1)</td>
<td>不稳定</td>
</tr>
<tr>
<td>基数排序</td>
<td>O(d(n+r_d))</td>
<td> </td>
<td>O(d(n+r_d))</td>
<td>O(r_d)</td>
<td>稳定</td>
</tr> 
<tr>
<tr>
<td>二叉树排序</td>
<td>O(n+k)</td>
<td>O(n+k)</td>
<td>O(n+k)</td>
<td>O(n+k)</td>
<td>稳定</td>
</tr> 
</tbody>
</table>

外部排序较为复杂，后续更新。。。

## 2、常识总结

* **平均情况下**，快排、希尔排序、归并排序和堆排序的时间复杂度为$O(nlogn)$，其他都为$O(n^2)$，基数排序则是$O(d(n+r_d))$;

> 助记：**快些**以$nlog_2n$的速度**归队**

* **空间复杂度**，快速排序$O(log_2n)$、归并排序$O(n)$、基数排序$O(r_d)$，其他都是$O(1)$;

* 直接插容易插，起泡起得好都是$O(n)$，初始序列已经有序;

> 稳定性助记：考研复习痛苦啊，情绪**不稳定**，**快些选一堆**好友来聊天吧.

这里需要注意简单选择排序有两个版本，交换板(数组为载体)和插入版(链表为载体)，后者能得到稳定的结果。

* 经过一趟排序，能保证一个关键字到达最终位置，交换类(起泡、快速)和选择类(简单选择、堆);
* 关键字比较次数和**原始序列无关**（简单选择排序、折半插入排序）;
* 排序算法和排序趟数和原始序列有关——**交换类排序**;
* 借助于 “比较” 进行的算法，在最坏的情况下时间复杂度至少为$O(nlog_2n)$.

> 更新于2018年10月25日00:30

