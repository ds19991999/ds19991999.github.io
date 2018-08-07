---
layout: post
title: 第二章 线性表
---


### 1.线性表的基本操作

#### 1.1 结构体定义
```c
//顺序表
typedef struct
{
	int date[maxSize];
	int length;
}Sqlist;

//考试中用的最多的顺序表定义
int A[maxSize];
int n;

//单链表结点定义
typedef struct LNode
{
	int date;
	struct LNode *next;
}LNode;

//双链表结点定义
typedef struct DLNode
{
	int date;
	struct DLNode *prior;
	struct DLNode *next;
}DLNode;
//制作结点，为新结点分配内存空间（针对没有头结点的指针）
LNode *A = (LNode*)malloc(sizeof(LNode));
```

#### 1.2 顺序表的操作

```c
//向列表中插入元素x,使顺序表仍然保持递增序列
//功能函数
int findeElem(Sqlist L,int x)
{
	int i;
	for(i=0;i<L.length;i++)
	{
		if(x<L.date[i])return i;
	}
	return i;
}
//接口函数
void insertElem(Sqlist &L,int x)
{
	int p,i;
	p = findElem(L,x);
	for(i=L.length-1;i>=p;--i)
		L.date[i+1]=L.date[i];
	L.date[p]=x;
	++(L.length);
}

//算法：在顺序表中查找第一个等于e的元素
int findElem(Sqlist L,int e)
{
	int i;
	for(i=0;i<L.length;++i)
		if(e==L.date)[i]return i;
	return -1;//失败标记
}

//算法:插入数据元素
int insertElem(Sqlist &L,int p,int e)
{
	int i;
	if(p<0||p>L.length||L.length==maxSize)return 0;
	for(i=L.length-1;i>=p;--i)
		L.date[i+1]=L.date[i];
	L.date[p]=e;
	++(L.length);
	return 1;
}

//算法：删除数据元素
int deleteElem(Sqlist &L,int p,int &e)
{
	int i;
	if(p<0||p>L.length)return 0;
	e=L.date[p];
	for(i=p;i<L.length;i++)
		L.date[i]=L.date[i+1];
	--(L.length);
	return 1;
}

//算法：初始化顺序表
void initList(Sqlist &L)
{
	L.length=0;
}

//算法：求指定位置元素
int getElem(Sqlist L,int p,int &e)
{
	if(p<0||p>L.length-1)return 0;
	e=L.date[p];
	return 1;
}
```

#### 1.3 单链表操作

```c
void merge(LNode *A,LNode *B,LNode *&C)
{
	LNode *p=A->next;
	LNode *q=B->next;
	LNode *r;
	C = A;
	C->next=NULL;
	free(B);
	r = C;
	while(p!=NULL&&q!=NULL)
	{
		if(p->date<=q->date)
		{
			r->next=p;
			p=p->next;
			r=r->next;
		}
		else
		{
			r->next=q;
			q=q->next;
			r=r->next;
		}		
	}
	r->next=NULL;
	if(p！=NULL)r->next=p;
	if(q!=NUll)r->next=q;
}

//算法：尾插法将数组中n个元素建立链表C
void creatlistR(LNode *&C,int a[],int n)
{
	LNode *s,*r;
	int i;
	C = (LNode*)malloc(sizeof(LNode));
	C->next=NULL;
	r=C;
	for(i=0;i<n;i++)
	{
		s=(LNode*)malloc(sizeof(LNode));
		s->date=a[i];
		r->next=s;
		r=r->next;
	}
	r->next=NULL;
}

//算法：头插法
void creatlistF(LNode *&C,int a[],int n)
{
	LNode *s;
	int i;
	C=(LNode*)malloc(sizeof(LNode));
	C->next=NULL;
	for(i=0;i<n;i++)
	{
		s=(LNode*)malloc(sizeof(LNode));
		s->date=a[i];
		s->next=C->next;
		C->next=s;
	}
}

//归并成递减的单链表算法
void merge(LNode *A,LNode *B,LNode *&C)
{
	LNode *p=A->next;
	LNode *q=B->next;
	LNode *s;
	C=A;
	C->next=NULL;
	free(B);
	while(p!NULL&&q!NULL)
	{
		if(p->date<=q-<date)
		{
			s=p;
			p=p->next;
			s->next=C->next;
			C->next=s;
		}
	}
	while(p!=NULL)
	{
		s=p;
		p=p->next;
		s->next=C->next;
		C->next=s;		
	}
	while(q!=NULL)
	{
		s=q;
		q=q->next;
		s->next=C->next;
		C->next=s;
	}
}

//单链表插入结点
s->next=p->next;
p->next=s;

//结点删除
q=p->next;
p->next=p->next->next;
free(q);

//查找链表中是否存在值为x的结点，如果存在就删除，并返回1
int findAndDelete(LNode *C,int x)
{
	LNode *p,*q;
	p=c;
	while(p->next!=NULL)
	{
		if(p->next->date==x)
			break;
		p=p->next;
	}
	if(p->next==NULL)return 0;
	else
	{
		q = p->next;
		p->next=p->next->next;
		free(q);
	}
}
```

#### 1.4 双链表操作

```c
//尾插法建立双链表
void createDlistR(DLNode *&L,int a[],int n)
{
	DLNode *s,*r;
	int i;
	L=(DLNode*)malloc(sizeof(DLNode))
	L->prior=NULL;
	L->next=NULL;
	r=L;
	for(i=0;i<n;i++)
	{
		s=(DLNode*)malloc(sizeof(DLNode));
		s->date=a[i];
		r->next=s;
		s->prior=r;
		r=s;
	}
	r->next=NULL;
}

//插入结点的算法
s->next=p->next;
s->prior=p;
p->next=s;
s->next->prior=s

//删除结点的算法
q=p->next;
p->next=q->next;
q->next->prior=p;
free(q);
```

#### 1.5 循环链表操作
- 循环单链表的终端结点的next结点指针指向表头结点；
- 循环双链表的终端结点的next指针指向表头结点，头结点的prior指针指向终端结点


### 2.实例
- 顺序表A[  ]（有m+n个元素）的前m个元素和后n个元素都递增有序，设计算法，使整个顺序表有序


```c
void insertElem(int A[],int m,int n)
{
	int i,j;
	int temp;
	for(i=m;i<m+n-1;++i)
	{
		temp=A[i];
		for(j=i-1;j>=0&&temp<A[j];--j)	
			A[j+1]=A[j];
		A[j+1]=temp;
	}
}
```
>- 递增单链表A、B求差集A-B（除去A中A与B共有元素）


```c
void diffrence(LNode *A,LNode *B)
{
	LNode *p=A->next;
	LNode *q=B->next;
	LNode *pre=A;
	while(p!=NULL&&q!=NULL)
	{
		if(p->date<q->date)
		{
			pre=p;
			p=p->next;
		}
		else if(p->date>q->date)
			q=q->next;
		else
		{
			pre->next=p->next;
			r=p;
			p=p->next;
			free(r);
		}
	}
}
```
