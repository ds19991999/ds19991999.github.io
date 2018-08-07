---
layout: post
title: 第八章 排序
---

```c
#include <stdio.h>
 
//1.插入排序
void InsetSort(int R[], int n)
{
    int i,j,temp;
    for(i=1;i<n;++i)
    {
        //将待插关键字存入temp中 
        temp=R[i];
        j=i-1;
        while(j>=0&&temp<R[j])
        {
            R[j+1]=R[j];
            --j;    
        }
        //j+1相当于需要插入的关键字的位置 
        R[j+1]=temp;            
    }        
} 

//2.折半插入排序
//返回有序关键字
int order(int R[], int n)
{
    int i;
    for(i=0;i<n;++i)
    {
        if(R[i]>R[i+1])return i;    
    }    
}

void HarfSort(int R[], int n)
{
    int i,j,m;
    int s,k,temp;
    int high;
    high = order(R,n);
    for(s=high+1;s<n;++s)
    {
        temp=R[s];//待插关键字 
        i=0;j=s-1;//需要将temp其中插入的序列
        while(i<=j)
        {
            //有序中间关键字 
            m=(i+j)/2;
            //如果关键字的值小于中间值，则右边等于中间关键字 
            if(temp<R[m])j=m-1;
            else i=m+1;
        } 
        //将元素右移，方便关键字插入
        for(k=s-1;k>=m;--k)R[k+1]=R[k];
        R[i]=temp;  //不知道为什么是i                
    }    
}

//3.起泡排序
void BubbleSort(int R[], int n)
{
    int i,j,flag,temp;
    for(i=n-1;i>=0;--i)
    {
        flag=0;
        for(j=1;j<=i;++j)
        {
            if(R[j-1]>R[j])
            {
                temp=R[j-1];
                R[j-1]=R[j] ;
                R[j]=temp;
                flag=1;   
            }    
        }
        if(flag==0)return;    
    }    
} 


//4.起泡排序2
void BubbleSort2(int R[], int n)
{
    int i,temp;
    int len = n;
    while(len>0)
    {
        for(i=0;i<n-1;++i)
        {
            if(R[i]>R[i+1])
            {
                temp=R[i];
                R[i]=R[i+1];
                R[i+1]=temp;                   
            }    
        } 
        --len;  
    }    
} 

//5.快速排序
void QuikSort(int R[], int low, int high)
{
    int temp;
    int i=low, j=high;
    if(low<high)
    {
        temp=R[low];
        while(i<j&&R[j]>=temp)--j;
        if(i<j)
        {
            R[i]=R[j];
            ++i;    
        }   
        while(i<j&&R[i]<temp)++i;
        if(i<j)
        {
            R[j]=R[i];
            --j;    
        }   
        R[i]=temp;
        QuikSort(R,low,i-1);
        QuikSort(R,i+1,high); 
    }   
} 

//6.简单选择排序
//挑出最小的关键字 
void SelectSort(int R[], int n)
{
    int i,j,k,temp;
    for(i=0;i<n;++i)
    {
        k=i;
        for(j=i+1;j<n;++j)
        {
            if(R[k]>R[j])
                k=j;    
        }
        temp=R[i];
        R[i]=R[k];
        R[k]=temp;    
    }    
} 

//7.堆排序
// 完成low到high上的low结点的调整
void Sift(int R[], int low, int high)
{
    int i=low,j=2*i+1;
    int temp=R[i];
    
    while(j<=high)
    {
        if(j<high&&R[j]<R[j+1])
            ++j;
        if(temp<R[j])
        {
            R[i]=R[j];
            i=j;
            j=2*i+1;    
        }
        else break;    
    }
    R[i]=temp;    
} 

void HeapSort(int R[], int n)
{
    int i;
    int temp;
    //建立初始堆
    for(i<n/2;i>=0;--i)
        Sift(R,i,n);
    //出栈
    for(i=n-1;i>=1;--i)
    {
        temp=R[0];
        R[0]=R[i];
        R[i]=temp;
        Sift(R,0,i-1); 
    } 
}

//8.测试
int main()
{
    int i,len;
    int R[10]= {99,6,7,4,5,5,4,8,29,20};
    len=sizeof(R)/sizeof(R[0]);
    
    //InsetSort(R, len);
    //HarfSort(R,len);
    //BubbleSort(R, len);
    //BubbleSort2(R,len);
    QuikSort(R,0,len-1);
    //SelectSort(R,len);
    //HeapSort(R,len);
    
    for(i=0;i<len;++i)printf("%d\n",R[i]);
    
    printf("Press enter to continue ...");
    getchar();
    return 0;  
}
```

