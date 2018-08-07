---
layout: post
title: 第五章 数组、矩阵和广义表
---

### 1.矩阵的压缩存储

```c
//矩阵定义
#define m 4
#define n 5
int A[m][n];

//1.矩阵的转置
void trsmat(int A[][maxSize], int B[][maxSize], int m, int n)
{
	for(int i=0;i<m;++i)
		for(int j=0;j<n;++j) B[j][i]=A[i][j];
}

//2.矩阵相加
void addmat(int C[][maxSize],int A[][maxSize],int B[][maxSize],int m, int n)
{
	for(int i=0;i<m;++i) 
		for(int j=0;i<n;++j) C[i][j]=A[i][j]+B[i][j];
}

//3.矩阵相乘A:M*N,B:N*K,C:M*K
void mutmat(int C[][maxSize],int A[][maxSize],int B[][maxSzie],int m,int n,int k)
{
	for(int i=0;i<m;++i)
	{
		for(int j=0;j<k;++j)
		{
			C[i][j]=0;
			for(int h=0;h<n;++h) C[i][j]+=A[i][h]*B[h][j];
		}
	}
}
```
### 2.特殊矩阵和稀疏矩阵

```c
//1.三元组表示法
typedef struct
{
	int val;
	int i,j;
}Trimat;
Trimat trimat[maxterms+1];
//trimat[k].i和trimat[k].j表示取第k个非零元素在矩阵中的行下标和列下标

//也可以直接定义为
int trimat[maxterms+1][3]
//trimat[k][0]表示原矩阵按照行优先顺序的第k个非零元素的值
//trimat[k][1]、trimat[k][2]表示第k个非零元素在矩阵中的位置
//trimat[0][0],trimat[0][1]和trimat[0][2]为原矩阵非零元素个数，矩阵行数和列数
//如果矩阵元素为float类型，则定义为：
//float trimat[maxterms+1][3];
(int)trimat[k][1];//需要进行强制类型转换
(int)trimat[k][2];
```

建立三元组：

```c
void createtrimat(float A[][maxSize],int m,int n,float B[][3])
{
	int k=1;
	for(int i=0;i<m;++i)
	{
		for(int j=0;j<n)
		{
			if(A[i]A[j]!=0)
			{
				B[k][0]=A[i][j];
				B[k][1]=i;
				B[k][2]=j;
				++k;
			}
		}
		B[0][0]=k-1;
		B[0][1]=m;
		B[0][2]=n;
	}
}
```

通过三元组打印矩阵

```c
void print(float B[][3])
{
	int k=1;
	for(int i=0;i<B[0][1];++i)
	{
		for(int j=0;j<B[0][2];++j)
		{
			if(i==(int)B[k][1]&&j==(int)B[k][2])
			{
				cout<<B[k][0]<<" ";
				++k;
			}
			else cout<<"0 ";
		}
		cout<<endl;
	}
}
``` 
### 3.十字链表

```c
//普通结点定义
typedef struct QNode
{
	int row, col;//行数，列数
	struct OLNode *right, *down;
	float val;
}OLNode;

//头结点结构定义
typedef struct
{
		OLNode *rhead, *chead;//指向两头结点数组的指针
		int m,n,k;            //矩阵行数、列数以及非零结点总数
}CrossList;

//example：给定一个稀疏矩阵A，其尺寸为m*n,非零元素个数为k,建立其对应的十字链表存储结构
int createcrossListmat(float A[][maxSize],int m, int n,int k,CrossList &M)
{
	if(M.rhead)free(M.rhead);
	if(M.chead)free(M.chead);
	M.m=m;
	M.n=n;
	M.k=k;
	//申请头结点数组数组空间
	if(!(M.rhead=(OLNode*)malloc(sizeof(OLNode)*m)))return 0;
	if(!(M.rhead=(OLNode*)malloc(sizeof(OLNode)*m)))return 0;
	//头结点数组right和down指针置空(头行置空)
	for(int i=0;i<m;++i)
	{
		M.rhead[i].right=NULL;
		M.rhead[i].down=NULL;
	}
	//左列置空
	for(int i=0;i<n;++i)
	{
		M.chead[i].right=NULL;
		M.chead[i].down=NULL;
	}
	//建立列链表的辅助指针数组
	OLNode *temp_r[maxSize]；
	for(int j=0;j<n;++j) temp_r[j]=&(M.chead[j]);
	for(int i=0;i<m;++i)
	{
		OLNoden *c=&(M.rhead[i]);
		for(int j=0;j<n;++j)
		{
			if(A[i][j]!=0)
			{
				OLNode *p=(OLNode*)malloc*(sizeof(OLNode));
				p->row=i;
				p->col=j;
				p->val=A[i][j];
				p->down=NULL;
				p->right=NULL;
				c->right=p;
				c=p;
				temp_r[i]->down=p;
				temp_r[j]=p;
			}
		}
	}
	return 1;	
}
```

### 4.广义表

1. 广义表：表元素可以是原子或者广义表的一种线性表的扩展结构
- 广义表的深度：表中最上层元素的个数
- 广义表的长度：表中括号的最大层数
- 表头和表尾：当广义表非空时，第一个元素为广义表的表头，其余元素组成的表是广义表的表尾

2. 头尾链表存储结构(类似于不带头结点的单链表)两种结点：
- 原子结点：标记域和数据域
- 广义表结点：标记域、头指针、尾指针

3. 扩展线性表存储结构(类似于带头结点的单链表存储结构)l两种结点：
- 原子结点：标记域、数据域和尾指针域
- 广义表结点：标记域、头指针域和尾指针域
