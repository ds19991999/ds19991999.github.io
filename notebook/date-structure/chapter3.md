---
layout: post
title: 第三章 栈和队列
---

### 1.基本概念
栈：先进先出，顺序栈和链式栈，本质上是线性表
队列：先进后出，一种操作受限的线性表

### 2.结构体定义

```c
//1.顺序栈定义
typedef struct
{
	int date[maxSize];
	int top;
}SqStack;

//2.链栈结点定义
typedef struct LNode
{
	int date;
	struct LNode *next;
}LNode;

//3.顺序队列定义
typedef struct
{
	int date[maxSize];
	int front;
	int rear;
}SqQueue;

//4.链队定义
//队结点类型定义
typedef struct QNode
{
	int date;
	struct QNode *next;
}QNode;
//链队类型定义
typedef struct
{
	QNode *front;
	QNode *rear;
}LiNode;
```

### 3.顺序栈

```c
//1.顺序栈要素
st.top==-1;				//栈空
st.top==maxSize-1;		//栈满
//还有一种就是上溢和下溢

//2.两个操作
st.date[++(st.top)]=x;	//进栈
x=st.date[(st.top)--];	//出栈

//3.初始化栈
void initStack(SqStack &st)
{
	st.top=-1;
}

//4.判断栈空
int isEmpty(SqStack st)
{
	if(st.top==-1)return -1;
	else return 0;
}

//5.进栈
int push(SqStack &st, int x)
{
	if(st.top==maxSize-1)return 0;
	st.date[++(st.top)]=x;
	return 1;
}

//6.出栈
int pop(SqStack &st, int &x)
{
	if(st.top==-1)return 0;
	x=st.date[st.top--];
	return 1;	
}

//比较实用的写法
int stack[maxSize];int top=-1;
stack[++top]=x;
x=stack[top--];
```

### 4.链栈
```c
//1.要素
//两个状态
lst->next==NULL;	//栈空
					//栈满，除非内存耗尽

//两个操作
p->next=lst->next;lst->next=p;		//进栈
p=lst->next;x=p->date;lst->next=p->next;free(p);//出栈

//2.链栈的初始化代码
void initStack(LNode *&lst)\
{
	lst=(LNode*)malloc(sizeof(LNode));
	lst->next=NULL;
}

//3.判断栈空代码
int isEmpty(LNode *lst)
{
	if(lst->next==NULL)return 1;
	else return 0;
}

//4.进栈
void push(LNode *lst, int x)
{
	LNode *p;
	p=(LNode)malloc(sizeof(LNode));
	p->next=NULL;
	p->date=x;
	p->next=lst->next;
	lst->next=p;
}

//5.出栈
void pop(LNode *lst, int *&x)
{
	LNode *p;
	if(lst->next==NULL)return 0;
	p=lst->next;
	x=p->date;
	lst->next=lst->next->next;
	free(p);
	return 1;
}
```

### 5.栈的应用
```c
//1.算法：判断一个表达式的括号是否配对
int match(char exp[], int n)
{
	char stack[maxSize];int top=-1;   //顺序栈的定义和初始化
	int i;
	
	for(i=0;i<n;++i)
	{
		if(exp[i]=='(')stack[++top]='(';
		if(exp[i]==')')
		{
			if(top==-1)return 0;
			else top--;
		}
	}
	if(top==-1) return 1;
	else return 0;	
}

//2.算法：求后缀式表达式数值
//中缀式：（a+b+c*d）/e;
//前缀式：/++ab*cde;
//后缀式：abcd*++e/
int op(int a, char Op, int b)
{
	if(Op=='+')return a+b;
	if(Op=='-')return a-b;
	if(Op=='*')return a*b;
	if(Op=='/')
	{
		if(b==0)
		{
			cout<<"ERROR";
			return 0;
		}
		else return a/b;
	}
}

int com(char exp[])
{
	int i,a,b,c;      //其中a,b为操作数，c保存结果
	int stack[maxSize];int top=-1;
	char Op;
	for(i=0;exp[i]!='\0';++i)
	{
		//注意字符型和整型的转换
		if(exp[i]>='0'&&exp[i]<='9')stack[++top]=exp[i]-'0';
		else
		{
			Op=exp[i];
			b=stack[top--];//先取第二个操作数
			a=stack[top--];
			c=op(a,Op,b);
			stack[++top]=c;
		}
	}
	return stack[top];
}

//3.不带头结点的单链表存储链栈
void initStack(LNode *&lst)
{
	lst==NULL;
}
int isEmpltyl(LNode *lst)
{
	if(lst==NUll)return 1;
	else return 0;
}
void push(LNode *&lst, int x)
{
	LNodde *p;
	p=(LNode*)malloc(sizeof(LNode));
	p->next=NULL;
	p->date=x;
	//lst不带头结点
	p->next=lst->next;
	lst=p;
}
int pop(LNode *&lst, int &x)
{
	LNode *p;
	if(lst==NULL)return 0;
	p=lst;
	x=p->date;
	lst=p->next;
	free(p);
	return 1;
}
```

### 6.顺序队
```c
//1.四个要素
qu.rear==qu.front;	//队空
(qu.rear+1)%maxSize==qu.front;	//队满
qu.rear=(qu.rear+1)%maxSize;qu.date[qu.rear]=x;	//进队，移动队尾指针
qu.front=(qu.rear+1)%maxSize;x=qu.date[qu.front];	//出队，移动队首指针

//2.初始化队列
void initStack(SqQueue qu)
{
	qu.front=qu.rear=0
}

//3.判断队空
int isQueueEmpty(SqQueue qu)
{
	if(qu.rear==qu.front)return 1;
	else return 0;
}

//4.进队
int enQueue(SqQueue &qu, int x)
{
    //队满不能进队
	if((qu.rear+1)%maxSize==qu.front)return 0;
	qu.rear=(qu.rear+1)%maxSize;
	qu.date=x;
	return 1;
}

//5.出队
int deQueue(SqQueue &qu, int &x)
{
	if(qu.front==qu.rear)return 0;
	qu.front=(qu.front+1)%maxSize;
	x=qu.date[qu.front];
	return 1;
}
```

### 7.链队
```c
//1.要素
lqu->rear==NULL||lqu->front==NULL;	//队空
//不存在队满
lqu->rear->next=p;lqu->rear=p;	//进队
p=lqu->front;lqu->front=p->next;x=p->date;free(p);	//出队

//2.初始化链队
void initQueue(LiQueue *&lqu)
{
	lqu=(LiQueue*)malloc(sizeof(LiQueue));
	lqu->front=lqu->rear=NULL;
}

//3.判断队空
init isQueueEmpty(LiQueue *lqu)
{
	if(lqu->rear==NULL||lqu->front==NULL)return 1;
	else return 0;
}

//4.入队
void enQueue(LiQueue *lqu, int x)
{
	QNode *p;
	p=(QNode*)malloc(sizeof(QNode));
	p->date=x;
	p->next=NULL;
	if(lqu->rear==NULL)lqu->front=lqu->rear=p;
	else
	{
		lqu->rear->next=p;
		lqu->rear=p;
	}
}

//5.出队
int deQueue(LiQueue *lqu, int &x)
{
	QNode *p;
	if(lqu->rear==NULL)return 0;
	else p=lqu->front;
	if(lqu->front==lqu->rear)lqu->front=lqu->rear=NULL;
	else lqu->front=lqu->front->next;
	x=p->date;
	free(p);
	return 1;
}
```

### 8.实例
```c
//1.共享栈s0、s1的相关操作，共享elem[0,1,...,maxSize-1]
//结构体定义
typedef struct
{
	int elem[maxSize];
	int top[2];
}SqStack;
//入栈
int push(SqStack &st, int stNo, int x)
{
	if(st.top[0]+1<st.top[1])
	{
		if(stNo==0)
		{
			++(st.top[0]);
			st.elem[st.top[0]]=x;
			return 1;
		}
		else if(stNo==1)
		{
			--(st.top[1]);
			st.elem[st.top[1]]=x;
			return 1;	
		}
		else return -1;
	}
	else return 0;
}
//出栈
int pop(SqStack &st, int dtNo, int &x)
{
	if(stNo==0)
	{
		if(st.top[0]!=-1)
		{
			x=st.elem[st.top[0]];
			--(st.top[0]);
			return 1;
		}
		else return 0;
	}
	else if(stNo==1)
	{
		if(st.top[1]!=maxSize)
		{
			x=st.elem[st.top];
			++(st.top[1]);
			return 1;
		}
		else return 0;
	}
	else return -1;
}

//2.用两个栈s1和s2模拟一个队列
//入栈
int enQueue(SqStack &s1,SqStack &s2,int x)
{
	int y;
	if(s1.top==maxSize-1)
	{
		if(!isEmpty(s2))return 0;
		else if(isEmpty(s2))
		{
			while(!siEmpty(s1))
			{
				//s1中元素出栈，进入s2中
				pop(s1,y);
				push(s2,y);
			}
			push(s1,x);
			return 1;
		}
	}
	else
	{
		push(s1,x);
		return 1;
	}
}

//s2退栈，实现出队
int deQueue(SqStack &s2, SqStack &s1, int &x)
{
	int y;
	if(!isEmpty(s2))
	{
		pop(s2,x);
		return 1;
	}
	else
	{
		if(isEmpty(s1))return 0;
		else
		{
			while(!isEmpty(s1))
			{
				pop(s1,y);
				push(s2,y);
			}
			pop(s2,x);
			return 1;
		}
	}
}
//判断栈s1和s2模拟的队列是否为空
int isQueueEmpty(SqStack s1,SqStack s2)
{
	if(isEmpty(s1)&&isEmpty(s2))return 1;
	else return 0;
}
```
