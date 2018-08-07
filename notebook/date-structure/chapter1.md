---
layout: post
title: 第一章 绪论
---

### 1.代码规范

```c
//功能函数实现
void Reverse(int R[],int l,int r)
{
    int i,j;
    int temp;
    for(i=l,j=r;i<j;++i,--j)
    {
        temp=R[i];
        R[i]=R[j];
        R[j]=R[i]
    }
}
//函数接口
void RCR(int R[],int n,int p)
{
    if(p<=0||p>=0)cout<<"ERROR"<<endl;
    else
    {
        Reverse(R,0,p-1);
        Reverse(R,p,n-1);
        Reverse(R,0,n-1);
    }
}
//其余的一些东西可以不用写
```

### 2.C/C++基础

#### 2.1 数据类型

```c
//结构型
typedef struct
{
    int a;
    char b;
    float c;
}TypeA;

//链表结点定义
typedef struct Node
{
    int date;
    struct Node *next;
}Node;

//二叉树结点定义
typedef struct BTNode
{
    int date;
    struct BTNode *lchirld;
    struct BTNode *rchirld;
}BTNode;

//制作结点
//第一种严格要求自己不能用
BTNode BT;
//第二种经常用
BTNode *BT;
BT=（BTNode*）malloc(sizeof(BTNode));

//类似的申请动态数组空间
//下面是申请数组元素为int型，长度为n
int *p;
p=(int *)malloc(n * sizeof(int));
```

#### 2.2 函数

```c
//被传入的函数的参数不会发生改变
int a;
void f(int x)
{
    ++x;
}
a = 0;
f(a); //a=0

//被传入的参数发生改变,引用
void f(int &x)
{
    ++x;
}

//要求传入的指针发生改变
void f(int *&x)
{
    ++x;
}

//数组做参数用不用引用效果一样（只针对考研），数组元素改变
//一维数组做参数
void f(int x[],int n)
{
    ...;
}

//二维数组做参数,maxSize是已经定义了的常数
void f(int x[][maxSize],int n)
{
    ...;
}

//结构体参数改变
void insert(Sqlist &L,int x)
{
    int p,i;
    p = LocateElem(L,x);
    for(i = L.length-1;i>=p;--i)
        L.date[i+1]=L.date[i];
    L.date[p] = x;
    ++(L.length);
}

//C是一个指向一个链表表头的指针，不代表整个链表
//C不会变，但除C以外的所有结点都可能变化
//下面是删除链表中第一个出现x的结点
int SearchAndDelete(LNode *C,int x)
{
    LNode *p,*q;
    p = C;
    whlie(p->next!=NULL)
    {
        if(p->next->date==x)break;
        p = p->date;
    }
    if(p->next==NULL)return 0;
    else
    {
        q = p->next;
        p->next=p->next->next;
        free(q);
        return 1;
    }
}

//C指针可能传进来的是空指针，需要它指向表头结点，故使用引用
void merge(LNode *A,LNode *B,LNode *&C)
{
    LNode *p=A->next;
    LNode *q=B->next;
    LNode *r;
    C = A；
    C->next = NULL;
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
    r = r->next;    
    if(!p=NULL)r->next=p;
    if(!q=NULL)r->next=q;
}
```
