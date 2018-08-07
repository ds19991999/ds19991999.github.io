---
layout: post
title: 第六章 树与二叉树
---
### 1.二叉树的主要性质
- 叶子结点数：n0
- 单分支结点：n1
- 双分支结点：n2
- 总结点数：n0+n1+n2
- 总分支数：n1 + 2n2 = 总结点数 - 1 ，即n0 = n2 +1
- 叶子结点：双分支结点 + 1


### 2.二叉树的存储结构
```c
//1.顺序存储结构：采用一维数组进行存储，适合完全二叉树，用于一般结构的二叉树则会浪费大量存储空间；
//2.链式存储结构：
typedef struct BTNode
{
	char date;
	struct BTNode *lchild;
	sturct BTNode *rchild; 
}BTNode;
```
### 3.二叉树的遍历算法
#### 3.1 二叉树简单遍历算法

- 子树的遍历顺序都是先左后右
- ***二叉树的前中、中后这两对遍历序列可以唯一确定一棵二叉树，前后则不能确定***


```c
//1.先序遍历
void preorder(BTNode *p)
{
	if(p!=NULL)
	{
		Visit(p);             //访问根节点
		preorder(p->lchild);  //先遍历左子树
		preorder(p->rchild);  //后遍历右子树
	}
}

//2.中序遍历
void inorder(BTNode *p)
{
	if(p!=NULL)
	{
		inorder(p->lchild);
		Visit(p);
		inorder(p->rchild);
	}
}

//3.后序遍历
void posorder(BTNode *p)
{
	if(p!=NULL)
	{
		posorder(p->lchild);
		posorder(p->rchild);
		Visit(p);
	}
}
```
#### 3.2 例程
1.将表达式(a-(b+c))*(d/e)存储在以二叉链表为结构的二叉树中
```c
//明显是要用后序遍历
int op(int a,int b,char Op)
{
	if(op=='+')return a+b;
	if(op=='-')return a-b;
	if(op=='*')return a*b;
	if(op=='/')
	{
		if(b==0)
		{
			cout<<"ERROR"<<endl;
			return 0;
		}
		else return a/b;
	}
}

int com(BTNode *p)
{
	int A,B;
	if(p!=NULL)
	{
		if(p->lchild!=NULL&&p->rchild!=NULL)
		{
			A=com(p->lchild);
			B=com(p->rchild);
			return op(A,B,p->date);
		}
		else return p->date-'0';
		//如果当前结点的左右子树都为空，则为数值，直接返回
		//p->date-'0'是将字符型数字转换成整型数字
	}
	else return 0;//空树则返回0	
}
```
2.求二叉树的深度
```c
//左子树的深度为LD，右子树的深度为RD，用后序遍历
int getDepth(BTNode *p)
{
	int LD,RD;
	if(p==NULL)return 0;
	else
	{
		LD=getDepth(p->lchild);
		RD=getDepth(p->rchild);
		return (LD>RD?LD:RD)+1;//左子树和右子树的最大值加1
	}
}
```
3.查找date域值是否存在等于key的结点，存在则将q指向该结点，否则q=NULL

```c
//几种遍历都可以，这里采用先序遍历
void search(BTNode *p,BTNode *&q,int key)
{
	if(p!=NULL)
	{
		if(p->date==key) q=p;
		else
		{
			search(p->lchild,q,key);
			search(p->rchild,q,key);
		}
	}
}

//改进：左子树查找到满足要求的结点后，无须继续查找右子树
//称加入的这种操作称为截枝操作
void search(BTNode *p,BTNode *&q,int key)
{
	if(p!=NULL)
	{
		if(p->date==key)q=p;
		else
		{
			search(p->lchild,q,key)
			//截枝操作
			if(q==NULL)search(p->rchild,q,key);
		}
	}
}
``` 
4.输出先序序列中第k个结点的值

```c
int n=0;
//先序
void trave(BTNode *p,int k)
{
	if(p!=NULL)
	{
		++n;
		if(k==n)
		{
			cout<<p->date<<endl;
			return;
		}
		trave(p->lchild,k);
		trace(p->rchild,k);
	}
}

//中序
void trave(BTNode *p,int k)
{
	if(p!=NULL)
	{
		trave(p->lchild,k);
		++n;
		if(k==n)
		{
			cout<<p->date<<endl;
			return;
		}
		trave(p->rchild,k);
	}
}

//后序
void trave(BTNode *p,int k)
{
	if(p!=NULL)
	{
		trave(p->lchild,k);
		trave(p->rchild,k);
		++n;
		if(k==n)
		{
			cout<<p->date<<endl;
			return;
		}	
	}
}
```
5.先序遍历序列得到pre[l1，... ，r1]，中序遍历序列得到in[l2，... ，r2]，元素类型为char，并且二叉树中的数值互不相等，求由这两种序列构造的二叉树

```c
/*
思路：
先序遍历的第一个元素即为根结点数值，在中序遍历中找到a，由a将中序遍历
序列分成两个子序列，左边构成左子树，右边构成右子树；
再对左右子树采用同样的处理方式，直到子序列只有1一个元素时，构造结束。
*/
BTNode *CreateBT(char pre[],char in[]，int l1,int r2,int l2,int r2)
{
	BTNode *s;
	int i;
	
	//此语句不能去掉，代表处理序列长度为0的情况，而in[]这个数组只是一个参照数组
	if(l1>r1)return NULL;
	
	//申请一个结点空间
	s=(BTNode*)malloc(sizeof(BTNode));
	s->lchild=s->rchild=NULL;
	
	//通过找到in中的i确定左右子树范围
	for(i=r2;i<=r2;++i)
	{
		if(in[i]==pre[l1])break;
	}
	s->date=in[i];
		
	//对于中序遍历，[l2,i-1就是左子树，结点个数为i-1-l2，[i+1,r2]就是右子树,结点个数为r2-i-1
	//对于先序遍历，参照中序遍历，[l1+1,l1+i-l2]为左子树，[l1+i-l2+1,r1]为右子树
	//然后将左右子树根结点连接在s的左右指针域上
	s->lchild=CreateBT(pre,in,l1+1,l1+i-l2,l2,i-1);
	s->rchild=CreatBT(pre,in,l1+i-l2+1,r1,i+1,r2);
	//递归结束返回二叉树根结点s
	return s;
}
```
### 4.层次遍历（很重要）
- 即对二叉树的每一层进行遍历，需要建立一个循环队列
- 将二叉树头结点入队，然后出队列，访问该结点
- 如果有左子树，则左子树根节点入队
- 如果有右子树，则右子树根节点入队
- 然后出队列，对出队结点进行访问

1.具体算法
```c
void level (BTNode *p)
{
	int front, rear;
	BTNode *que[maxSize];
	front=rear=0;
	BTNode *q;
	if(p!=NULL)
	{
		rear=(rear+1)%maxSize;
		que[rear]=p;           //根节点入队
		while(front!=rear)     //对列不为空进行循环
		{
			front=(front+1)%maxSize;
			q=que[front];      //队头结点出队
			Visit(q);
			if(q->lchild!=NULL)//处理左子树
			{
				rear=(rear+1)%maxSize;
				que[rear]=p->lchild;
			}
			if(q->rchild!=NULL)//处理右子树
			{
				rear=(rear+1)%maxSzie;
				que[rear]=p->rchild;
			}
		}
	}
}
```

2.例程
```c
//要求：求二叉树的宽度
//1.对于非空树，根据上面算法，如果我们知道了当前结点的层号，就可以知道其左右孩子的层号
//2.考虑存储队列的数组足够长，队头元素不会被覆盖，rear=(rear+1)%maxSize和front=(front+1)%maxSize可以直接写为++rear和++front
//3.第一点知道每个结点的层号，第二点用数组存放结点，于是就可以知道最多的层上的结点

//定义顺序非循环队列元素，存储结点指针和结点层次号
typedef struct
{
	BTNode *p;
	int lno;
}St;

int maxNode(BTNode *b)
{
	//定义顺序非循环队列
	St que[maxSize];
	int front,rear;
	front=rear=0;
	
	int Lno,i,j,n,max;
	BTNode *q;
	
	if(b!=NULL)
	{
		++rear;
		que[rear].p=b;   //树根结点入队
		que.lno=1;       //树根结点层号为1
		                 //相当于初始化
		while(front!=rear)
		{
			++front;
			q=que[front].p;
		    //存放当前结点层次号，便于得知左右孩子的层次号
			Lno=que[front].lno;
			if(q->lchild!=NULL)
			{
				++rear;
				que[rear].p=q->lchild;
				que[rear].lno=Lno+1;
			}
			if(q->rchild!=NULL)
			{
				++rear;
				que[rear].p=q->rchild;
				que[rear].lno=Lno+1;
			}
		}
		//循环结束Lno保存这颗二叉树的最大层数
		max=0;
		for(i=1;i<=Lno;++i)
		{
			n=0;
			//遍历整个顺序循环队列，查找具有相同层次号的结点个数
			for(j=1;j<=rear;++j)
			{
				if(que[j].lno==i)++n;
				if(max<n)max=n;
			}
		}
		return max;		
	}
	else return 0;  //空树直接返回0
}
```
### 5.遍历算法改进
- **改进缘由**：

上述深度优先遍历算法都是用递归函数实现，系统需要调用栈进行处理（凡是递归函数，系统都自动调用栈处理诸于保护现场和恢复现场等操作）。

- 关于**递归中的系统调用栈**和**非递归用户自己定义的栈**：

递归函数所申请的系统栈，是一个所有递归函数都通用的栈。对于二叉树深度优先遍历算法，系统除了记录访问过的结点信息之外，还有其他信息需要记录，以实现函数的递归调用；

用户自定义的栈仅仅保存了遍历所需的结点信息，是对遍历算法的一个针对性设计，对于遍历算法，显然要比递归函数通用的系统栈更高效；

考研视角上，相同的算法，递归比非递归函数低效，但实际应用并不是。

1.先序遍历
- 思路：将树根结点入栈，然后出栈，将树根结点的右孩子先入栈，左孩子后入栈（先入栈后访问），循环直至遍历结束

```c
void preorderNonrecurision(BTNode *bt)
{
	if(bt!=NULL)
	{
		//定义顺序栈
		BTNode *Stack[maxSize];
		int top=-1;
		
		BTNode *p;
		Stack[++top]=bt;//根结点入栈
		while(top!=-1)
		{
			p=Stack[top--];//出栈并输出栈顶结点
			Visit(p);
			if(p->rchild!=NULL)Stack[++top]=p->rchild;
			if(p->lchild!=NULL)Stack[++top]=p->lchild;
		}
	}
}
```

2.中序遍历
- 思路：根节点入栈，如果栈顶结点左孩子存在，则左孩子入栈；如果左孩子不存在，则出栈并输出栈顶结点；然后检查右孩子是否存在，存在，则右孩子入栈，栈空结束算法

```c
void inorderNorecursion(BTNode *bt)
{
	if(bt!=NULL)
	{
		BTNode *Stack[maxSize];
		int top = -1;
		BTNode *p;
		p=bt;
		//可能最后存在右孩子但此时栈空的情况
		while(top!=-1||p!=NULL)
		{
			while(p!=NULL)   //左孩子存在则左孩子入栈
			{
				Stack[++top]=p;
				p=p->lchild;
			}
			if(top!=-1)
			{
				p=Stack[top--];
				Visit[p];
				p=p->rchild;
			}
		}
	}
}
``` 

3.后序遍历
- 思路：逆后序遍历是先序遍历过程中对左右子树遍历顺序交换所得的结果，所以只要将之前的非循环先序遍历的左右子树遍历顺序交换得到逆后序遍历，然后将逆后序逆序就得到后序遍历。即把逆后序遍历的元素依次出栈stack1，然后入栈stack2，此时栈2自顶向下的顺序即为后序遍历顺序，再依次出栈即可

```c
//与先序进行类比，基本一样
void posorderNonrecursion(BTNode *bt)
{
	if(bt!=NULL)
	{
		//定义两个栈
		BTNode *Stack[maxSize];int top1=-1;
		BTNode *Stack[maxSize];int top2=-1;
		BTNode *p=NULL;
		Stack1[++top1]=bt;
		while(top1 != -1)
		{
			p=Stack1[top1--];
			Stack2[top2++]=p;
			//左右子树遍历顺序变化
			if(p->lchild)Stack1[++top1]=p->lchild;
			if(p->rchild)Stack1[++top2]=p->rchild;
		}
		//栈2元素出栈
		while(top2 != -1)
		{
			p = Stack2[top2--];
			Visit(p);
		}
	}
}
```
### 6.线索二叉树
#### 6.1 概念描述
- 线索二叉树将上述的用户栈也省掉了，提高了一定的执行效率；
- **n个结点的二叉树有n+1个空链域**：

链域一共有2*N个，（每个点有两个链域），对于除了根节点以外的每个点都是有一个父亲节点，所以一共有N-1个指针指向某个节点，形成N-1个有东西的链域（减1即是父亲节点），所以一共有2*N-(N-1)=N+1个链域没有指向任何东西；

- **这种高效性体现在哪里**：

 二叉树被线索化后近似于一个线性结构，分支结构的遍历操作转化为近似于线性结构的遍历操作，通过线索的辅助使得寻找当前结点前驱或者后继的平均效率大大提高；
 
 由于每个结点多了两个ltag和rtag，它们导致的额外开销是否比非递归遍历算法中的栈空间开销小，在不同的场合很难确定，因此这里不提空间利用率的提高；
```c
typedef struct TBTNode
{
	char date;
	int ltag,rtag;      //线索标记
	struct TBTNode *lchild;
	struct TBTNode *rchild;
}
```
- **思路：**
左线索指针指向当前结点在中序遍历序列中的前驱结点，右线索指针指向后继结点；

定义一个p指针指向当前正在访问的结点，pre指向p的前驱结点（prior），p的左线索如果存在则让其指向pre，pre的右线索如果存在，则让其指向p。

当p要离开一个访问的结点时，pre指向p，当p来到一个新结点时，pre指向此时p所指结点的前驱结点。
#### 5.2 具体算法描述

```c
//1.中序遍历对二叉树进行线索化算法
void InThread(TBTNode *p,TBTNode *&pre)
{
	if(p!=NULL)
	{
		InThread(p->lchild,pre);
		if(p->lchild==NULL)//没有左孩子，存在左线索
		{
			p->lchild=pre；
			p->ltag=1;
		}
		if(pre!=NULL&&pre->rchild==NULL)//没有右孩子，则右线索存在
		{
			pre->rchild=p;
			pre->rtag=1;
		}
		//准备处理下一个结点
		pre=p;
		InThread(p->rchild,pre);
	}
}

//中序遍历建立中序线索二叉树
void creatInThread(TBTNode *root)
{
	TBTNode *pre=NULL;       //前驱结点指针
	if(root!=NULL)
	{
		InThread(root,pre);
		pre->rchild=NULL；   //非空二叉树线索化
		pre->rtag=1;         //后处理中序最后一个结点
	}
}

//遍历中序线索二叉树
//求以p为根的中序线索二叉树中，中序序列下的第一个结点
TBTNode *First(TBTNode *p)
{
	while(p->ltag==0)p=p->lchild;
	return p;
}

//求结点p在中序下的后继结点
TBTNode *Next(TBTNode *p)
{
	//如果右孩子存在，则返回右子树第一个中序需要访问下的结点
	if(p->rtag==0)return First(p->rchild);
	//右孩子不存在，则直接指向后继结点
	else return p->rchild;
}
//求最后一个结点
TBTNode *Last(TBTNode *p)
{
	while(p->rtag==0)p=p->rchild;
	return p;
}
//求结点p的前驱结点
TBTNode *Prior(TBTNode *p)
{
	if(p->ltag==0)return Last(p->lchild);
	else return p->lchild;
}

//中序线索二叉树上执行中序遍历算法
void Inorder
{
	for(TBTNode *p=First(root);p!=NULL;p=Next(p))
		Visit(p);
}
```

```c
//2.前序线索二叉树
void preThread(TBTNode *p,TBTNode *&pre)
{
	if(p!=NULL)
	{
		if(p->lchild==NULL)
		{
			p->lchild=pre;
			p->ltag=1;
		}
		if(pre!=NULL&&pre->rchild==NULL)
		{
			pre->rchild=p;
			pre->rtag=1;
		}
		pre=p;
		//左右指针不是线索才能继续递归
		if(p->ltag==0)preThread(p->lchild,pre);
		if(p->rtag==0)preThread(p->rchild,pre);
	}
}

//在前序线索二叉树上执行前序算法
void preorder(TBTNode *root)
{
	if(!root=NULL)
	{
		TBTNode *p=root;
		while(p!=NULL)
		{
			//左指针不是线索，则边访问边左移
			while(p->ltag==0)
			{
				Visit(p);
				p=p->lchild;
			}
			Visit(p);
			//左孩子不存在，右孩子不管是不是非空都指向其后继结点
			p->rchild;
		}
	}
}
```

```c
//3.后序线索二叉树
void postThread(TBTNode *p,TBTNode *&pre)
{
	if(p!=NULL)
	{
		postThread(p->lchild,pre);
		postThread(p->rchild,pre);
		if(p->lchild==NULL)
		{
			p->lchild=pre;
			p->ltag=1;
		}
		if(pre!=NULL&&pre->rchild==NULL)
		{
			pre->rchild=p;
			pre->rtag=1;
		}
		pre=p;
	}
}

/*
简要描述：
1) 如果结点x是二叉树的根，则其后继为空；
2) 如果结点x是其双亲的右孩子，或者是其双亲的左孩子且其双亲没有右子树，则其后继即为双亲；
3) 如果x是其双亲的左孩子，且其双亲有右子树，则其后继结点为双亲右子树按后序遍历列出的第一个结点。
*/
```
### 7.相关树的转换和概念描述
#### 7.1 树与二叉树的转换
- 两个概念：

1）用二叉链表存储二叉树，结点一个指针指向左孩子(lchild)，另一个指向右孩子（rchild）；

2） 用二叉链表存储树，结点中的一个指针指向孩子（child），另一个指向兄弟结点（sibling），这就是孩子兄弟存储结构

- 二叉树转换为树就是上述的逆过程


#### 7.2 森林和二叉树的转换
- 其实就是上述树与二叉树的拓展，直接将头结点连起来就可以了

#### 7.3 树与森林的遍历
- 树的遍历只有先序和后序遍历，与二叉树中的先序后序相同
- 森林的遍历也只有先序和后序遍历：

**先序遍历：**先访问森林的第一颗树的根结点，然后先序遍历第一棵树的根结点的子树，最后先序遍历森林中除了第一棵树以外的其他树；

**后序遍历:**后序遍历第一颗树的根结点的子树，然后访问第一棵树的根结点，最后后序遍历森林中除第一棵树以外的森林；

其实就是一棵树接着一棵树遍历，完全一样。

#### 6.4 赫夫曼树和赫夫曼编码
- 树的路径长度：从根到每个结点的路径长度之和；
- 树的带权路径长度（WPL）：树中所有叶子结点的带权路径长度之和；
- 赫夫曼树又叫最优二叉树，特点是**带权路径最短**。


**赫夫曼树构造方法:**

1. 描述：

给定n个权值的结点，用这n个权值来构造赫夫曼树算法：
（1）将这n个权值看作只有根结点的n棵二叉树，构成的集合记为F；
（2）从F中选出两棵根结点的权值最小的树作为左右子树a、b，构造一棵新的二叉树c，即新的二叉树的结点的权值为左右子树的权值之和
（3）从F中删除a、b，加入新构造的c；
（4）重复（2）（3），直至F只剩下一棵树为止。

2. 赫夫曼树编码

1）对于包含同一内容的文件有多种存储方式，我们可以找出一种最节省空间的存储方式，如.zip\.jpeg等文件的底层技术都用到了赫夫曼编码；
2）编码方式是不定长的，**解码问题**的处理：采用前缀码解决。在前缀码中，**任一字符的编码串都不是另一字符编码串的前缀**；
3）编码规则：被编码的字符处在叶子结点上，而**根通往任一叶子结点的路径都不可能是通往其余叶子结点的子路径**，所以可以使用根通往叶子的路径对该叶子结点进行编码；
4）采用赫夫曼树构造的前缀码，其树的带权路径长度是最短的，即赫夫曼编码产生的是最短前缀码（一般左子树权值小于右子树权值）；

3. 赫夫曼n叉树
1）当发现构造不了三叉树的时候，可以采用补上一个权值为0的结点；
2）构造方法：
与赫夫曼二叉树构造方法相同，左边是权值小的结点，右边是权值大的结点。
