---
layout: post
title: 第四章 串
---


### 1.串数据类型的定义

#### 1.1 定义和存储结构

```c
char str[]="abcdef";
//定长顺序存储
typedef struct
{
	char str[maxSize+1];//加1是为了多出一个用来存储'\0'作为结束标记
	int length;
}Str;
//变长分配存储
typedef struct
{
	char *ch;
	int length;
}Str;
```

#### 1.2 串的基本操作

```c
//1.赋值
int strassign(Str& str,char* ch)
{
	if(str.ch)free(str.ch)    //释放原数组空间
	int len=0;
	char *c=ch;               //c指向ch
	while(*c)                 //求串的长度
	{
		++len;
		++c;
	}
	if(len==0)
	{
		str.ch=NULL;
		str.length=0;
		return 1;
	}
	else
	{
		str.ch=(char*)malloc(sizeof(char)*(len+1));
		if(str.ch==NULL)return 0;
		else
		{
			c=ch;
			for(int i=0;i<=len;++i,++c)str.ch[i]=*c;
			str.length=len;
			return 1;
		}
	}
}
//strassign(str,"cur input")

//2.取串的长度
int strlength(Str str)
{
	return str.length;
}

//3.串比较操作
int strcompare(Str s1, Str s2)
{
	for(int i;i<s1.length&&i<s2.length;++i)
	{
		if(s1.ch[i]!=s2.ch[i])return s1.ch[i]-s2.ch[i];
		return s1.length-s2.length;
	}
}

//4.串连接操作
int concat(Str &str, Str str1, Str str2)
{
	//如果str不为空，则释放str空间
	//如果为空，则返回0，也就是不能进行串操作
	if(str.ch)
	{
		free(str.ch);
		str.ch=NULL;
	}
	str.ch=(char*)malloc(sizeof(char)*(str1.length+str2.length+1));
	if(str.ch==NULL)return 0;
	int i=0;
	while(i<str1.length)
	{
		str.ch[i]=str1.ch[i];
		++i;
	}
	int j;
	while(j<=str2.length)
	{
		str.ch[i+j]=str2.ch[j];
		++j;
	}
	str.length=str1.length+str2.length;
	return 1;
}

//5.求子串操作
//从pos处开始，长度为len的子串
int substring(Str& substr, Str str, ingt pos,int len)
{
	if(pos<0||pos>=str.length||len<0||len>str.length-pos)return 0;
	if(substr.ch)
	{
		free(substr.ch);
		substr.ch=NULL;
	}
	if(len==0)
	{
		substr.ch=NULL;
		substr.length=0;
		return 1;
	}
	else
	{
		substr.ch=(char*)malloc(sizeof(char)*(len+1));
		int i=pos;
		int j=0;
		while(i<pos+len)
		{
			substr.ch[j]=str.ch[i];
			++i;
			++j;
		}
		substr.ch[j]='\0';
		sunstr.length=len;
		return 1;
	}
}

//6.串清空操作
int clearstring(Str& str)
{
	if(str.ch)
	{
		free(str.ch);
		str.ch=NULL;
	}
	str.length=0;
	return 1;
}
```

### 2.串的模式匹配算法

#### 2.1 简单模式匹配算法

```c
//对一个串中的定位操作称为串的模式匹配
//其中串中字符存放在1-length的位置上
int index(Str str,Str substr)
{
	int i=1,j=1,k=i;
	while(i<=str.length&&j<=str.length)
	{
		if(str.ch[i]==substr.ch[j])
		{
			++i;
			++j;
		}
		else
		{
			j=1;
			i=++k;
		}
	}
	if(j>substr.length)return k;
	else return 0;	
}
```

#### 2.2KMP算法

```c
//思路：每当发生模式串不匹配的情况，先找出发生不匹配的字符pj,取其子串F=p1p2p3...Pj-1
//将模式串后移，使F最先发生前部（FL）和后部（FR）相重合的位置，即模式串后移的目标位置
//即j指向的F前后重合的子串的长度+1（FL和FR的长度加1）,可以定义一个next[j]数组,取j=1~m
//m为模式串长度，表示模式串中第j个字符发生不匹配时，应从next[j]处的字符开始重新发生与主串比较

//求next数组：
//next[j]已知，t为当前F最长相等前后缀长度（即FL和FR的长度next[j]=t）
//当pj=pt，则next[j+1]=t+1;
//当pj!=pt,则t=next[t];
void getnext(Str substr, int next[])
{
	int j=1,t=0;next[1]=0;
	while(j<substr.length)
	{
		if(t==0||substr.ch[i]==substr.ch[t])next[++j]=++t;
		else t=next[t];
	}
}

//得到next数组之后，可以将简单算法改进成著名的KMP算法
int KMP(Str str, Str substr, int next[])
{
	//假设从下标为1开始存储的字符
	int i=1, j=1;
	while(i<=str.length&&j<=substr.length)
	{
		if(j==0||str.ch[i]==substr.ch[j])
		{
			++i;
			++j;
		}
		else j=next[j];
	}
	if(j>substr.length)retrun i-substr.length;
	else return 0;
}
```

#### 2.3 KMP算法的改进

```c
//当j=1时，nextva[j]=0,作为特殊标记
//pj!=pk时，nextval[j]=next[j]=k;
//pj=pk时，nextval[j]=nextval[next[j]]=nextval[k];
void getnextval(Str substr,int nextval[])
{
	int i=1,j=0;
	nextval[1]=0;
	while(i<substr.length)
	{
		if(j==0||substr.ch[i]==substr.ch[j])
		{
			++i;
			++j;
			// 加了这两句
			if(substr.ch[i]!=substr.ch[j])nextval[i]=j;
			else nextval[i]=nextval[j];
		}
		else j=nextval[j];
	}
}
```

### 3.KMP算法详解

> 要求：对一个串中某个子串进行定位操作，返回匹配到的串的起始位置
> 假设所有串的起始字符索引为1


数据结构定义：
```c
typedef struct
{
	char *ch;
	int length;
}Str;
```

#### 3.1 简单模式匹配

```c
//指向原串的索引i需要回溯，从原串中的每一个字符重新进行匹配，直到匹配成功
int index(Str str,Str substr)
{
	//i,j分别为原串和模式串的索引
	//k记录匹配时上一次的起始位置
	int i=1,j=1,k=i;
	while(i<=str.length&&j<=str.length)
	{
		if(str.ch[i]==substr.ch[j])++i,++j;
		//匹配失败则回溯到上一次开始匹配的位置加1
		else j=1,i=++k;	//i的回溯	
	}
	if(j>substr.length) return k;//返回匹配成功索引
	else return 0;//没有匹配到
}
```

#### 3.2 KMP算法

##### 3.2.1 思路
1.  主体思路：
- i 不用进行回溯，当原串和模式串不发生匹配时，先找出模式串中的不匹配字符pj，取其模式串的子串F=p1p2p3...pj-1，找出F的前部分FL和后部分FR最先发生相重合的位置，将模式串后移到该位置，即j重新指向的位置是F串中前后重合的子串长度加1；
- 我们可以定义一个next[j]数组表示模式串中第j个字符不发生匹配时，应该从next[j]处的字符重新与原串比较。
2. 特殊情况：
1）模式串的第一个字符与原串就不匹配，则从原串的下一个位置同模式串进行匹配；
2）当串F中不存在前后重合的部分，则从原串中不发生匹配的字符同模式串的第一个字符开始比较；
3. 求next[j]数组例子：


| 模式串 | A | B | A | B | A | B |  B |
|:--------:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|    j        | 1  | 2 | 3  | 4 | 5 | 6  | 7 |
| next[j]  | 0  | 1 | 1 | 2  |  3| 4   |  5|

将上述描述转换成简洁的代码描述：

```c
//t=next[j]
//这一点是KMP的核心，仔细琢磨
if(pj=pt)next[j+1]=t+1;
else t=next[t];
```

##### 3.2.2 next[ j ]数组代码实现

```c
void getnext(Str substr, int next[])
{
	int i=1,j=0;
	//对next[1]进行初始化,即next[i]=j,这一点也很重要
	next[1]=0;
	while(i<substr.length)
	{
		//模式串匹配
		//如果pi=pj,则，next[i+1]=j+1
		//如果不匹配，则j=next[j];
		if(j==0||substr.ch[i]==substr[j])next[++i]=++j;
		else j=next[j];
	}
}
```

##### 3.2.3 著名的KMP算法

```c
int KMP(Str str, Str substr, int next[])
{
	int i=1,j=1;
	while(i<=str.length&&j<=str.length)
	{
		if(j==0||str.ch[i]==substr.ch[j])++i,++j;
		else j=next[j];
		//没有了i的回溯，这是KMP算法的精髓
		//充分利用了模式串的重复性
		//即使不存在重复字段，在比较时，实现最大的移动量
	}
	if(j>substr.length)return i-substr.length;//返回匹配成功索引
	else return 0;//没有匹配到
}
```

#### 3.3 上述KMP算法的改进
- 上述KMP算法在一种特殊情况下有些匹配显得有些多余
例如下面这个next数组:

| 模式串 | A | A | A | A | A | B |
|:---------:|:--:|:--:|:--:|:--:|:--:|:--:|
|    j        | 1  | 2 | 3  | 4 | 5 | 6 |
| next[j]  | 0  | 1 | 2  | 3 | 4 | 5 |

- 当j = 5时，发生不匹配时，因next[5] = 4，则需将j回溯4进行比较，而next[4]=3，则需将j回溯到3进行比较。。。j需要一次回溯到5、4、3、2、1的位置上，我们可以改进一下next数组，直接跳过位置1~4的回溯，定义改进后的数组为nextval[ j ]。

代码实现步骤：

```c
//k=next[j]
//1.当j=1时，和next数组一样，将nextval[1]=0;
//2.当pj=pk时，nextval[j]=nextval[k];
//3.pj!=pk时，nextval[j]=k;
//第二步是算法改进的关键

//这是next数组，放在一起比较
//t=next[j]
//这一点是KMP的核心，仔细琢磨
if(pj=pt)next[j+1]=t+1;
else t=next[t];

//于是可以改进为
//匹配成功
++i;++j;
if(substr.ch[i]!=substr.ch[j])nextval[i]=j;
else nextval[i]=nextval[j];
//匹配失败,直接跳转到nextval[j]
j=nextval[j];
```
nextval数组函数：
```c
void getenextval(Str substr, int nextval[])
{
	int i=1,j=0;
	nextval[1]=0;
	while(i<substr.length)
	{
		if(j==0||substr.ch[i]=substr.ch[j])
		{
			++i;++j;
			if(substr.ch[i]!=substr.ch[j]) nextval[i]=j;
			else nextval[i]=nextval[j];
		}
		else j=nextval[j];
	}
}
```

#### 3.4 最完整的KMP算法实现

```c
typedef struct
{
	char *ch;
	int length;
}Str;

void getenextval(Str substr, int nextval[])
{
	int i=1,j=0;
	nextval[1]=0;
	while(i<substr.length)
	{
		if(j==0||substr.ch[i]=substr.ch[j])
		{
			++i;++j;
			if(substr.ch[i]!=substr.ch[j]) nextval[i]=j;
			else nextval[i]=nextval[j];
		}
		else j=nextval[j];
	}
}

int KMP(Str str, Str substr, int nextval[])
{
	int i=1,j=1;
	while(i<=str.length&&j<=str.length)
	{
		if(j==0||str.ch[i]==substr.ch[j])++i,++j;
		else j=nextval[j];
	}
	if(j>substr.length)return i-substr.length;
	else return 0;
}
```
