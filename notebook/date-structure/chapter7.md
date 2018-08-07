---
layout: post
title: 第七章 图
---

### 1.图的存储结构
- 极大连通子图：从一个顶点开始作为子图，逐个添加和这个子图有边相连的顶点，直到所有相连的顶点都被纳入图中，所生成的子图就是一个极大连通子图。

#### 1.1 邻接矩阵
- 设G=（V，E）是具有n个顶点的图，顶点序号依次为0，1，... ，n-1，则G的邻接矩阵具有如下定义的n阶方阵A：
`A[i][j]=1`，表示顶点i和顶点j邻接，即i与j之间存在边或者弧；
`A[i][j]=0`，表示顶点i和顶点j不邻接（0<=i，j<=n-1）。
- 邻接矩阵是图的顺序存储结构；

```c
//邻接矩阵结构体定义
typedef struct
{
    int no;                    //顶点编号
    char info;               //顶点其他信息，这里默认是char型，
                                  //一般题目很少用到，可以不用写
}VertexType；               //顶点类型
 
 //图的定义
typedef struct
{
    int edges[maxSize][maxSize];
    //邻接矩阵的定义，如果是有权图，则在句中将int换为float
    int n,e;                  //顶点数和边数
    VertexType vex[maxSize];         //存放结点信息
}MGraph;
```

#### 1.2 邻接表
- 邻接表是图的链式存储结构；
- 邻接表是由单链表的表头形成的顶点表和单链表其余结点形成的边表两部分组成；
- 顶点表存放顶点信息和指向第一个边结点指针，边表存放与当前相邻接顶点的序号和指向下一个边结点的指针；

```c
//边表结点
typdedef struct ArcNode
{
    int adjvex;                         //该边指向的结点位置
    struct ArcNode *nextarc;            //指向下一边的指针
    int info;                           //该边的相关信息（如权值），一般可以不写
}ArcNode;
//顶点表
typedef struct
{
    char date;
    ArcNode *firstarc;        //指向第一条边的指针
}VNode;
//邻接表
{
    VNode adjlist [maxSize];       //邻接表
    int n,e;                       //顶点数和边数
}AGraph;
```

#### 1.3 邻接多重表(有点看不懂...)
- 与十字链表类似，由顶点表和边表组成，每一条边用一个结点表示；
- 顶点表：vertex域存储和该顶点相关的信息，firstedge域指示第一条依附于该顶点的边；
- 边表结点：6个域

```
mark域为标记域：标记该条边是否被搜索过；
ivex和jvex：该边依附的两个顶点在图中的位置；
ilink：指向下一条依附于顶点ivex的边；
jlink：指向下一条依附于顶点jvex的边；
info为指向与边相关的各种信息的指针域；
```
### 2.图的遍历

#### 2.1 深度优先搜索遍历
DFS类似于二叉树的先序遍历：
- 首先访问出发点v，并将其标记为已访问过，然后选取与v邻接的未被访问的任意一个结点信息w，并访问他；
- 选取与w邻接的未被访问的结点并访问他，以此重复进行；
- 当一个顶点所有的邻接顶点都被访问过，则依次退回到最近被访问过的结点；
- 若该结点还有其他邻接结点未被访问，则从这些未被访问的结点中选取一个并重复上述过程，直至图中所有顶点都被访问过。
- 算法描述：认取一个结点，访问，检查这个结点的所有邻接结点，递归访问其中未被访问的顶点

```c
//以邻接表存储结构为例
int visit[maxSize];
//visit[]作为顶点的访问标记的全局数组，初始化为0
void DFS(AGraph *G,int v)
{
	ArcNode *p;
	visit[v]=1;                   //置已访问标记
	Visit(v);                    
	p=G->adjlist[v].firstarc;     //p指向顶点第一条边
	while(p!=NULL)
	{
		if(visit[p->adjvex]==0)   //若顶点未访问，则递归访问它
		{
			DFS(G,p->adjvex);     //(1)
			p=p->nextarc;         //p指向顶点v的下一条边的终点
		}
	}
}

//与二叉树对比
void preorder(BTNode *p)
{
	if(!p=NULL)
	{
		visit(p);
		preorder(p->left);       //(2)
		preorder(p->right);      //(3)
	}
}
```
- 图的深度优先搜索遍历和二叉树的先序遍历的区别:二叉树的先序遍历对于对于每个结点要递归的访问两个分支,图的深度优先搜索遍历则是要递归地访问多个分支;
- 把图的深度优先搜索遍历过程中所经历的边保留,其余的边删掉,就形成一棵树,称为**深度优先搜索生存树**.

#### 2.2 广度优先搜索遍历
- 类似于树的层次遍历
- 基本思想:首先访问起始顶点v,然后选取与v邻接的全部顶点w1,...,wn进行访问,再依次访问与w1,...,w2邻接的全部顶点(已经访问的除外),直到所有结点访问过为止.
- 算法过程:
1.取图中一个顶点进行访问,入队,并将这个顶点标记为已访问;
2.当队列不空时循环执行:出队,依次检查出队顶点的所有邻接顶点,访问没有被访问过的邻接顶点并将其入队;
3.当队列为空时跳出循环,广度优先搜索即完成.

```c
//以邻接表为例
void BFS(AGraph *G, int v, int visit[maxSize])
//visit[]数组全部初始化为0
{
	ArcNode *p;
	int que[maxSize],front=rear=0;
	int j;
	Visit(v);
	visit[v]=1;
	rear=(rear+1)%maxSize;       //当前顶点v入队
	que[rear]=v;
	while(front!=rear)           //队空遍历完成
	{
		front = (front+1)%maxSize;   //顶点出队
		j=que[front];
		p=G->adjlist[j]firstarc;     //p指向出队顶点的第一条边
		while(p!=NULL)               //将p的所有邻接顶点中未被访问的入队
		{
			if(visit[p->adjvex]==0)
			{
				Visit(p->adjvex);
				visit[p->adjvex]=1;
				rear=(rear+1)%maxSize;   //该顶点进队
				que[rear]=p->adjvex;
			}
			p=p->nextarc;                //p指向j的下一条边
		}
	}
}
```
```
//上述是针对连通图的,对于非连通图,只需用一个循环检测图中每个顶点即可
//1.深度优先搜索遍历
void dfs(AGraph *g)
{
	int i;
	for(i=0;i<g->n;++i)   //n是顶点数
	{
		if(visit[i]==0)DFS(g,i);
	}
}
//2.广度优先搜索遍历
void bfs(AGraph *g)
{
	int i;
	for(i=0;i<g->n;++i)
	{
		if(visit[i]==0)BFS(g,i,visit);
	}
}
```
#### 2.3 例程

```c
//1.求不带权无向连通图G距离顶点v最远的一个顶点
//采用广度优先搜索遍历,返回最后一个结点即可
int BFS(AGraph *G,int v)
{
	ArcNode *p;
	int que[maxSize],front=rear=0;
	int visit[maxSize];
	int i,j;
	for(i=0;i<G->n;++i)visit[i]=0; //初始化visit
	rear=(rear+1)%maxSize;   //顶点v入队
	que[rear]=v;
	visit[v]=1;
	
	while(front!=rear)
	{
		front=(front+1)%maxSize;   //出队
		j=que[front];
		p=G->adjlist[j].firstarc;   //p指向出队结点p的第一条边
		while(p!=NULL)
		{
			front=(front+1)%maxSize;
			j=que[front];
			p=G->adjlist[j].firstarc;
			while(p!=NULL)
			{
				if(visit[p->adjvex]==0)
				{
					visit[p->adjvex]=1;
					rear=(rear+1)%maxSzie;
					que[rear]=p->adjvex;
				}
				p=p->nextarc;
			}
		}
	}
	return j;   //队空时保存了遍历过程中的最后一个顶点
}

//2.判断无向图G是否是一棵树
//满足树的条件是有n-1条边的连通图,n为图中顶点的个数
void DFS2(AGraph *G,int v,int &vn,int &en)
{
	ArcNode *p;
	visit[v]=1;
	++vn;
	p=G->adjvex[v].firstarc;
	while(p!=NULL)
	{
		++en;
		if(visit[p->adjvex]==0)DFS2(G,p->adjvex);
		p=p->nextarc;
	}
}
int GisTree(AGraph *G)
{
	int vn=0,en=0,1;
	for(i=0;i<G->n;++i)visit[i]=0;
	DFS2(G,1,vn,en);
	if(vn==G->n&&(G->n-1)==en/2)return 1;
	//遍历过程中访问过的顶点数和图中的顶点数相等,且边数等于顶点数减1,则是树
	//注意en,每个顶点都算了一次,最后总和相当于边数的两倍,所以要除以2
	else return 0;
}

//3.图采用邻接表存储,判断顶点i和顶点j(i!=j)之间是否有路径
//分析:从顶点i开始进行一次深度搜索遍历,遍历过程中遇到j说明i,j有路径
int DFSTrave(AGraph *G, int i, int j)
{
	int k;
	for(k=0;k<G->n;++n)visit[k]=0;  //初始化visit[]数组
	DFS(G,i);
	if(visit[j]==1)return 1;
	else return 0;
}
```
### 3.最小(代价)生成树
- 都是针对无向图的

#### 3.1 普里姆算法
1. 思想:从图中任意取一个顶点,把他当成一棵树,在**与这棵树相接的边中**选取一条**最短(权值最小)的边**,并将这个及其所连接的顶点也并入这棵树中,然后继续找与**树相邻**的边中最短的边,将边及其顶点并入树中,依此类推,直到图中所有顶点都被并入树中为止.

2.vset[ ]数组:存放顶点有没有被并入生存成树中;

3.lowcost[ ]数组:存放**当前生成树到剩余各顶点最短边的权值**,最短边条数对应剩余顶点个数;

4.算法过程:

- 将v0到其他顶点的所有边当作候选边;
- 重复以下步骤n-1次,使得其他n-1个顶点被并入到生成树中:
1)从候选边中挑选出权值最小的边输出,并将与该边另一端相接的顶点v并入到生成树中;
2)考察所有剩余顶点vi,如果(v,vi)的权值比lowcost[vi]小,则用(v,vi)的权值更新lowcost[vi];

```c
//形参写成MGraph会使得参数传入因复制了一个较大的变量而变得低效
//用引用型避免函数参数复制
void Prim(MGraph g,int v0,int &sum)
{
	int lowcost[maxSize],vset[maxSize],v;
	int i,j,min;
	v=v0;
	for(i=0;i<g.n;++i)
	{
		lowcost[i]=g.edges[v0][i];//顶点v0的边的权值
		vset[i]=0;
	}	
	vset[v0]=1;           //将v0并入树中
	sum=0;                //sum清零用来累计树的权值
	for(i=0;i<g.n-1;++i)
	{
		min=INF;          //INF是一个已经定义的比图中所有边权值都大的常量
		for(j=0;j<g.n;++j)
		{
			if(vset[j]==0&&lowcost[j]<min)
			{
				min=lowcost[j];
				k=j;
			}
		}
		vset[k]=1;
		v=k;
		sum+=min;//sum即是最小生成树的权值
		//循环以刚并入的顶点v为媒介更新候选边
		for(j=0;j<g.n;++j)
		{
			if(vset[j]==0&&g.edges[v][j]<lowcost[j])
				lowcost[j]=g.edges[v][j];
		}
	}
}
//时间复杂度：O(n^2)，普里姆算法适用于稠密图
```
#### 3.2 克鲁斯卡尔算法
- 每次找出候选边中权值最小的边，将该边并入生成树中，重复过程直到所有边被检测完成；
- 算法描述：将图中各边按权值从小到大排序，然后从小边开始扫描各边，并检测当前边是否为候选边，如果该边的并入不会构成回路，则将该边并入当前生成树中，直到所有边都被检测完为止。
- 并查集:通过树中的一个结点，可以找到其双亲结点，进而找到根结点。
```
1.可以快速的将两个含有很多元素的集合并为一个；
2.可以方便的判断两个元素是否属于同一个集合。
```
```c
//假设road[]数组中存放了图中各边及其所连接的两个顶点的信息，且排序函数已经存在
typedef struct
{
	int a,b;    //a,b为一条边的两个顶点
	int w;      //边的权值
}Road;
Road road[maxSize];
int v[maxSize]; //并查集数组
int getroot(int a)
{
	while(a!=v[a])a=v[a];
	return a;
}
void Kruskal(MGraph g,int &sum,Road road[])
{
	int i;
	int N,E,a,b;
	N=g.n;   //顶点数
	E=g.e;   //边数
	sum=0;
	for(i=0;i<N;++i)v[i]=i;
	sort(road,E);    //对并查集数组进行从小到大权值排序
	for(i=0;i<E;++i)
	{
		a=getRoot(road[i].a);
		b=getRoot(road[i].b);
		
		//不构成回路，则可以并入
		if(a!=b)
		{
			v[a]=b;
			sum+=road[i].w;   //此处生成树的权值可以改为其他写法
		}
	}
}
//克鲁斯卡尔算法时间复杂度主要花费在选取的排序算法上
//排序算法的规模由图的边数e决定
//克鲁斯卡尔算法适用于稀疏矩阵
```
### 4.最短路径
#### 4.1 迪杰斯特拉算法
1.迪杰斯特斯拉算法用于求解图中某一个顶点到其余各顶点的最短路径

2.思想：集合S（存放图中已找到最短路径的顶点），集合T（存放图中剩余顶点），S每并入一个新的结点vu，都要修改顶点v0到集合T中顶点的最短路径长度值。

3.引入三个辅助数组`dist[],path[],set[]`

- dist[vi]：当前已找到的从v0到每个终点vi的最短路径长度，初态：`若v0到vi有边，则dist[vi]为边上的权值，否则置dist[vi]为∞`；-- ---- path[vi]：保存从v0到vi最短路径上vi得前一个顶点，初态：`如果v0到vi有边，则path[vi]=v0,否则path[vi]=-1`；
- set[vi]：set[vi]=0表示vi在T中，没有被并入最短路径，否则已经被并入路径，初态：`set[v0]=1,其余元素全为0`；

4.算法描述：
- 从当前dist[]数组选出最小值，假设为dist[vu]，set[vu]=1;
- 循环扫描图中顶点：对于当前顶点vj，`if set[vj]=1,什么都不做；else if dist[vj]>dist[vu]+w 更新路径，将vu加入vj之前的那个顶点路径;else 什么都不做`
- 对1和2循环n-1次，即可得到v0到其余所有顶点的最短路径；

5.path数组其实保存了一棵用双亲存储结构存储的树，通过这棵树可以打印从源点到任何一个顶点最短路径上所经过的所有顶点。
```c
void printfPath(int path[],int a)
{
	int stack[maxSize],top=-1;
	//这个栈以由叶子结点到根结点的顺序将其入栈
	while(path[a]!=-1)
	{
		stack[++top]=a;//先将叶子顶点入栈
		a=path[a];
	}
	stack[++top]=a;  //源点
	while(top!=-1)
		cout<<stack[top--]<<" ";//出栈并打印出栈元素，实现顶点逆序打印
	cout<<endl;
}
```
```
//迪杰斯特拉算法
void Dijkstra(MGraph g,int v,int dist[],int path[])
{
	int set[maxSize];
	int min,i,j,u;
	//对各数组初始化
	for(i=0;i<g.edges[v][i])
	{
		dist[i]=g.edges[v][i];
		set[i]=0;
		if(g.edges[v][i]<INF)path[i]=v;
		else path[i]=-1;
	}
	set[v]=1;path[v]=-1;
	//初始化结束
	//关键操作
	for(i=0;i<g.n-1;++i)
	{
		min=INF;
		//从剩余顶点选取一个顶点，通往这个顶点的路径在通往所有剩余结点中路径最短
		for(j=0;j<g.n;++j)
		{
			if(set[j]==0&&dist[j]<min)
			{
				u=j;
				min=dist[j];
			}
		}
		set[u]=1;  //将选出的顶点并入最短路径
		//将选出的顶点作为中间点，对所有通往剩余顶点的路径进行检测
		for(j=0;j<g.n;++j)
		{
			//判断顶点u的加入是否会出现通往顶点j的更短的路径
			//如果出现，则改变路径长度，否则什么都不做
			if(set[j]==0&&dist[u]+g.edges[u][j]<dist[j])
			{
				dist[j]=dist[u]+g.edges[u][j];
				path[j]=u;
			}
		}
	}
	//关键操作结束
}
//函数结束，dist[]数组存放了v点到其余顶点的最短路径长度
//path[]中存放v点到其余各顶点的最短路径
```
- 时间复杂度：O(n^2)

#### 4.2 费洛伊德算法
- 费洛伊德算法用来求任意一对顶点间的最短路径，迪杰斯特拉算法求图中某一顶点到其余各顶点的最短路径；
- 求解最短路径的一般过程：
1. 设置两个矩阵A和Path，初始化时将图的邻接矩阵赋值给A，将矩阵Path中元素全部设置为-1；
2. 以顶点k作为中间结点，k=0~n-1，对图中所有顶点对{i，j}进行如下检测与修改；
3. `if A[i][j]>A[i][k]+A[k][j],则A[i][j]=A[i][k]+A[k][j],Path[i][j]=k;else do nothing;` 

```c
void Floyd(MGraph g,int Path[][maxSize])
{
	int i,j,k;
	int A[maxSize][maxSize];
	//对A[][]和Path[][]进行初始化
	for(i=0;i<g.n;++j)
	{
		for(j=0;j<g.n;++j)
		{
			A[i][j]=g.edges[i][j];
			Path[i][j]=-1;
		}
	}
	//完成以k为中间点对所有顶点对{i，j}进行检测和修改
	for(k=0;k<g.n;++k)
	{
		for(i=0;i<g.n;++i)
		{
			for(j=0;j<g.n;++j)
			{
				if(A[i][j]>A[i][k]+A[k][j])
				{
					A[i][j]=A[i][k]+A[k][j];
					Path[i][j]=k;
				}
			}
		}
	}
}
```
### 5.拓扑排序
1.AOV网：对于一个工程，各个活动之间的先后次序关系可以用一个有向图来表示，以顶点表示活动，以边表示活动的先后次序。

2. 拓扑排序核心算法：对于在有向图找到一个拓扑排序
- 从有向图中选择一个没有前驱的顶点输出；
- 删除1中的顶点，并且删除从该顶点发出的全部边；
- 重复上述两步，直到剩余图中不存在没有前驱的点为止。

3.以邻接表为存储结构：
```c
typedef struct
{
    char date;
    int count;             //此句为新增部分，count来统计顶点当前入度
    ArcNode *firstarc;
}VNode;
```
```c
//拓扑排序
int TopSort(AGraph *G)
{
	int i,j,n=0;
	int stack[maxSize],top=-1;      
	ArcNode *p;
	//将图中入度为0的顶点入栈
	for(i=0;i<G->n;++i)
	{
		if(G->adjlist[i].count==0)
			stack[++top]=i;
	}
	//关键操作
	while(top!=-1)
	{
		i=stack[top--];              //顶点出栈
		++n;                         //计数器加1，统计当前顶点
		cout<<i<<" ";                //输出当前顶点
		p=G->adjlist[i].firstarc;
		//将所有由此结点引出的边所指的顶点的入度减小1，将这个过程中入度为0的顶点入栈
		while(p!=NULL)
		{
			j=p->adjvex;             //该边所指向的结点位置
			--(G->adjlist[j].count);
			if(G->adjlist[j].count==0)
				stack[++top]=j;
			p=p->nextarc;            //指向下一条边的顶点
		}
	}
	//关键操作结束
	if(n==G->n) return 1;
	else return 0;
}
```
- 拓扑排序序列不唯一：当前步骤有多个入度为0的顶点时，可以任选一个输出，这就造成了拓扑排序序列的不唯一。
- 逆拓扑有序序列：
1. 在网中选择一个没有后继的顶点(出度为0)输出；
2. 在网中删除该顶点，并删除所有到达该顶点的边；
3. 重复上述两步，直到AOV网中已无出度为0的顶点为止。

- 拓扑排序时间复杂度：O(n+e)，e为图中边的条数。

### 6.关键路径
- AOE网和AOV网：

1. 相同点：都是有向无环图；

2. 不同点：

- AOE网的边表示活动，边有权值，边代表活动持续时间；顶点代表事件，事件是图中新活动开始或者旧活动结束的标志。
- AOE网的顶点表示活动，边无权值，边无权值，边代表活动之间的先后关系。
- AOE网只存在一个入度为0的顶点，即源点，表示整个工程的开始，也只存在一个出度为0的顶点，即汇点，表示工程的结束。

关键路径：AOE网中，从源点到汇点的所有路径中，具有最大路径长度的路径，是整个工期所完成的最短时间。

剩余时间等于活动的最迟发生时间减去活动的最早发生时间，剩余时间反应了活动完成的一种松弛度。

一个工程的完成需要执行图中所有活动，只不过关键路径执行时间是整个图中所有活动所完成的时间。
### 7.例程
```c
//1.判断以邻接表方式存储的有向图中是否存在由顶点vi到顶点vj的路径
//思路：广度优先搜索遍历BFS，起点为vi，BFS退出之前遇到vj，则证明有路径
int BFS(AGraph *G,int vi,int vj)
{
	ArcNode *p;
	int que[maxSize],front=rear=0;
	int visit[maxSize];
	int i,j;
	for(i=0;i<G->n;++i)visit[i]=0;
	rear=(rear+1)%maxSize;
	que[rear]=vi;
	visit[vi]=1;
	while(front!=rear)
	{
		front=(front+1)%maxSize;//出队
		j=que[front];
		if(j==vj)return 1;//找到了顶点vj
		p=G->adjlist[j].firstarc; //指向出队顶点的第一条边
		while(p!=NULL)
		{
			if(visit[p->adjvex]==0)
			{
				rear=(rear+1)%maxSize;
				que[rear]=p->adjvex;
				visit[p->adjvex]=1;
			}
			p=p->nextarc;               //p指向下一条边
		}
	}
	return 0;
}
```
```c
//2.有向图G中，如果r到G中的每个结点都有路径可达，则称结点r为G的根结点
//判断有向图是否有根
//深度优先搜索遍历DFS，以r为起点进行DFS遍历，若在函数退出时已经访问所有顶点，则r为根
int visit[maxSize],sum;                 //假设常量maxSize已经定义
void DFS(AGraph *G,int v)
{
	ArcNode *p;
	visit[v]=1;
	++sum;//每访问一个顶点，加1
	p=G->adjlist[v].firstarc;
	while(p!=NULL)
	{
		if(visit[p->adjvex]==0)
		{
			DFS(G,p->adjvex);
			p=p->nextarc;
		}
	}
}

void print(AGraph *G)
{
	int i,j;
	for(i=0;i<G->n;++i)
	{
		sum=0;                      //每次选取一个新起点计数器清零
		for(j=0;j<G->n;++j)visit[j]=0;  //每次进行DFS时访问标记数组清零
		DFS(G,i);
		if(sum==G->n)cout<<i<<endl;     //当图中所有顶点全部被访问时则判断为根，输出
	}
}
```
