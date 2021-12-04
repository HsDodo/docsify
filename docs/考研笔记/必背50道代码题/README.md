<div style='text-align: center;'>
<h1> <font size=6em color='#ff7f50'>数据结构代码题</font>
</h1></div>




---





## 🎃线性表

### <font size=4em color='#9ed048'>顺序表:</font> 

1. __将两个有序表合并为一个新的有序顺序表，并由函数返回结果顺序表。__

   【算法思想】

    首先，按照顺序不断取下两个顺序表表头较小的结点存入新的顺序表中。然后， 看看哪个表还有剩余，将剩下的部分加到新的顺序表后面。

```c++
bool Merge(SqList A, SqList B, SqList &C)
{
    if(A.length + B.length > C.length) //表长超过
    	 return false;	
    int i = 0, j = 0, k = 0;
    while(i < A.length && j<B.length)
    { //循环，两两比较，小者存入结果表
        if(A.data[i] <= B.data[j])
         C.data[k++] = A.data[i++];
        else
         C.data[k++] = B.data[j++];
    }
    while(i < A.length)
         C.data[k++] = A.data[i++];
    while(j < B.length)
         C.data[k++] = B.data[j++];
    C.length = k;
    return true; 
} 
```



2. __从顺序表中删除具有最小值的元素（假设唯一）并由函数返回被删除元素的 值。空出的位置由最后一个元素填补。__

   【算法思想】

    搜素整个顺序表，查找最小值元素并记在其位置，搜索结束后用最后一个元素填 补空出的原最小值元素的位置。

```c++
bool Delete_Min(SqList &L ,ElemType &value)
{
    //删除顺序表 L 中最小值元素结点，并通过引用型参数 value 返回其值
    if(L.length == 0)
	     return false; //表空，终止操作
    value = L.data[0];
    int pos = 0; //假设 0 号元素的值最小
    for(int i = 1; i<L.length; i++) //循环遍历，寻找具有最小值的元素
    {
  	   if(L.data[i] < value) //让 value 记忆当前具有最小值的元素
        {
        value = L.data[i];
        pos = i;
        } 
    } 
    L.data[pos] = L.data[L.length-1]; //空出的位置由最后一个元素填补
    L.length--;
    return true;
} 
```



3.  __【2010 年统考】设将 n(n>1)个整数存放在一维数组 R 中。试着设计一个在时间复杂度和空间复杂度都尽可能高效的算法，将 R 中保存的序列循环左移 p__

    __（0<p<n) 个 位 置 ， 即 将 R 中 的 数 据 由 （ x0,x1, … ,xn-1 ） 变 换 为 （ xp, xp+1,…,xn-1,x0,x1,…,xp-1）。要求：__

    （1）给出算法的基本设计思想； 

    （2）根据算法设计思想，采用 C 或 C++语言描述，关键之处给出注释 

    （3）说明你所设计算法的时间复杂度和空间复杂度。

    ```c++
    void Reverse(int R[], int left, int right)
    { 
         //将数组原地逆置
         i = left, j = right;
         while(i < j)
         {
             int tmp = r[i];
             r[i] = r[j];
             r[j] = tmp;
             i++; //i 右移动一个位置
             j--; //j 左移一个位置
         }
    }
    void LeftShift(int R[], int n, int p)
    { //将长度为 n 的数组 R 中的数据循环左移 p 个位置
         if(p>0 && p<n)
            if(L.data[i] < value) 
             {
                 Reverse(r,0,n-1); //将数组全部逆置
                 Reverse(r,0,n-p-1); //将前 n-p 个数据逆置
                 Reverse(r,n-p,n-1); //将后 p 个数据逆置
             }
    }
    ```

    还有一种方法是开数组来辅助 leetcode有原题

4.  __逆转顺序表中的所有元素 算法思想：第一个元素和最后一个元素对调，第二个元素和倒数第二个元素对调，……，依此类推。__

```c++
void Reverse(int A[], int n) 
{ 
     int i, t; 
     for (i=0; i < n/2; i++) 
     { 
         t = A[i]; 
         A[i] = A[n-i-1]; 
         A[n-i-1] = t; 
     } 
} 
```





### <font size=4em color='#9ed048'>链表:</font> 

1. __将两个递增的有序链表合并为一个递增的有序链表。要求结果链表仍使用原 来两个链表的存储空间，不另外占用其他的存储空间。表中不允许有重复的数 据。__ 

```C++
void MergeList(LinkList &La, LinkList &Lb, LinkList &Lc)
{ //将两个递增的有序链表 La 和 Lb 合并为一个递增的有序链表 Lc
     pa = La->next; //pa 是链表 La 的工作指针，初始化为首元结点
     pb = Lb->next; //pb 是链表 Lb 的工作指针，初始化为首元结点
     Lc = pc = La; //La 的头结点作为 Lc 的头结点
     while(pa && pb)
     {
         if(pa->data < pb->data)
         { //取较小者 Lb 中的元素，将 pb 链接在 pc 的后面，pb 指针后移
            pc->next = pa;
            pc = pa;
            pa = pa->next;
         }
         else if(pa->data > pb->data)
         {
             //取较小者 Lb 中的元素，将 pb 链接在 pc 的后面，pb 指针后移
            pc->next = pa;
            pc = pa;
            pa = pa->next;
            q = pa->next;
            free(pb);
            pb = q;
         }
     } 
     pc->next = pa?pa:pb; //将非空的剩余元素直接链接在 Lc 表的最好
    free(Lb); //释放 Lb 的头结点
}

```



2. __试编写在带头结点的单链表 L 中删除一个最小值结点的高校算法（假设最小 值结点是唯一的）。__

__算法思想__：用 p 从头至尾扫描单链表，pre 指向*p 结点的前驱，用 minp 保存值 最小的结点指针（初值为 p）,minpre 指向*minp 结点的前驱（初值为 pre）。一 遍扫描，一边比较，若 p->data 小于 minp->data，则将 p、pre 分别赋值给 minp， minpre，如下图所示。当 p 扫描完毕，minp 指向最小值结点，minpre 指向最小 值结点的前驱结点，再将 minp 所指结点删除即可。

```C++
LinkList Delete_Min(LinkList &L)
{
    //L 是带头结点的单链表，本算法是删除其最小值结点
    LNode *pre = L, *p = pre->next; //p 为工作指针，pre 指向其前驱
    LNode *minpre = pre, *minp = p; //保存最小值结点及其前驱
    while(p != NULL)
    {
 	   if(p->data < min->data)
        {
            minp = p;
            minpre = pre;
        }
        pre = p; //继续扫描下一节点
        p = p->next; 
    } 
    minpre->next = minp->next; //删除最小值结点
    free(minp);
    return L;
} 
```



3. __在带头结点的单链表 L 中，删除所有值为 x 的结点，并释放其空间，假设值为 x 的结点不唯一，试编写算法实现上述操作。__

   ```C++
   void Delete_x(LinkList &L, ElemType x)
   {
       //L 为带头结点的单链表，本算法删除 L 中所有值为 x 的结点
       LNode *p = L->next, *pre = L, *q; //置 p 和 pre 的初值
       while(p != NULL)
       {
           if(p->data == x)
           {
               q = p; //q 指向该结点
               p = p->next; 
               pre->next = p; //删除*q 结点
               free(q); //释放*q 结点的空间
           }
           else //否则，pre 和 p 同步后移
           {
               pre = p;
               p = p->next;
           }//else
       } //while
   } 
   ```

   4. __试编写算法将带头结点的单链表就地逆置，所谓“就地”是辅助空间复杂度 为 O(1)。__

__算法思想__：将头结点摘下，然后从第一结点开始，一次插入到头结点的后面（头 插法建立单链表），直到最后一个结点为止，这样就实现了链表的逆置，如下图 所示。

```c++
inkList Reverse(LinkList L)
{
    //L 是带头结点的单链表，本算法将 L 逆置
    LNode *p, *r; //p 为工作指针，r 为 p 的后继，以防断链
    p = L->next; //从第一个元素结点开始
    L->next = NULL; //先将头结点 L 的 next 域值为 NULL 
    while(p != NULL) //依次将元素结点摘下
    {
        r = p->next; //暂存 p 的后继
        p->next = L->next;//将 p 结点插入到头结点之后
        L->next = p;
        p = r;
    } 
    return L;
} 
```

leetcode原题 可以弄个dummy节点，画图解决



5. __将一个带头结点的单链表 A 分解为两个带头结点的单链表 A 和 B，使得 A 表 中中含有原标中序号为奇数的元素，而 B 表中含有原表中序号为偶数的元素， 且保持其相对顺序不变。__

   ```C++
   LinkList DisCreat(LinkList &A)
   {
       //将 A 表中结点按照序号的奇偶性分解到表 A 或者表 B 中
       i = 0; //i 记录表 A 中结点的序号
       B = (LinkList)malloc(sizeof(LNode)); //创建 B 表表头
       B->next = NULL; //B 表初始化
       LNode *ra = A, *rb = B; //ra 和 rb 将分别指向将创建的 A 表和 B 表的尾节点
       p = A->next;
       A->next = NULL; //将 A 表置空
       while(p != NULL)
       {
           i++; //序号+1 
           if(i % 2 == 0) //处理序号为偶数的链表结点
           {
               rb->next = p; //在表尾插入新结点
               rb = p; //rb 指向新尾结点
           }
           else
           {
               ra->next = p; //处理原序号为奇数的结点
               ra = p; //在 A 表尾插入新的结点
           }
           p = p->next; //将 p 恢复为指向新的待处理结点
       }
       ra->next = NULL;
       rb->next = NULL;
       return B;
   }
   
   
   ```

   

6. __设 C = {a1，b1，a2，b2，…，an，bn}为线性表，采用头结点的 hc 单链表存放， 设计一个就地算法，将其拆分为两个单链表，使得 A = {a1，a2，…，an}，B = {bn，…， b2，b1}。 __

​    __算法思想：__本题的思路和上题基本一样，不设置序号变量。二者的差别仅在于对 B 表的建立不采用尾插法，而是采用头插法。

```c++
LinkList DisCreat(LinkList &A)
{
    LinkList B = (LinkList)malloc(sizeof(LNde)); //创建 B 表表头
    B->next = NULL; //B 表的初始化
    LNode *p = A->next, *q; //p 为工作指针
    LNode *ra = A; //ra 始终指向 A 的尾节点
    while(p != NULL)
    {
        ra->next = p; ra = p; //将*p 链接到 A 的表尾
        p = p->next;
        q = p->next;
        p->next = B->next; //头插后，*p 将断链，因此 q 记忆*p 的后继
        B->next = p; //*p 插入到 B 的前端
        p = q;
    } 
    ra->next = NULL; //A 的尾节点的 next 域置空
    return B; 
} 
```

7. __设计算法将一个带头结点的单链表 A 分解为两个具有相同结构的链表 B 和 C， 其中 B 表的结点为 A 表中小于零的结点，而 C 表中的结点为 A 表中值大于零的 结点（链表 A 中的元素为非零整数，要求 B、C 表利用 A 表的结点）。 __

【算法思想】 

首先将 B 表的头结点初始化 A 表的头结点，为 C 申请一个头结点，初始化为空 表。从 A 表的首元结点开始，一次对 A 表进行遍历。p 为工作指针，r 为 p 的后 继指针。当 p->data<0 时，将 p 指向的结点适用前插法插入到 B 表中；当 pa->data>0 时，将 p 指向的结点适用前插法插入到 C 表，然后 p 指向新的待插入的结点

```c++
void Decompose(LinkList &A, LinkList &B, LinkList &C)
{
    //单链表 A 分解为两个具有相同结构的链表 B 和 C
    B = A;
    B->next = NULL;
    C = (LinkList)malloc(sizeof(LinkList));
    C->next = NULL;
    p = A->next;
    while(p != NULL)
    {
        r = p->next; //暂存 p 的后继
        if(p->data < 0) //将小于 0 的结点插入 B 中，前插法
        {
             p->next = B->next;
             B->next = p;
        }
        else
        {
            p->next = C->next;
            C->next = p;
        }
        p = r; //p 指向新的待处理结点
    } 
}
```



8. __设计一个算法，通过一趟遍历确定长度为 n 的单链表中值最大的结点，返回 该结点的数据域。__

   ```c++
   ElemType Max(LinkList L)
   {
       //确定单链表中值最大的结点
       if(L->next == NULL) 
        return NULL;
       pmax = L->next; //pmax 指向首元结点
       p = L->next->next; //p 指向第二个结点
       while(p != NULL) //遍历链表，如果下一个结点存在
       {
           if(p->data > pmax->data)
             pmax = p; //pmax 指向数值大的结点
           p = p->max; //p 指向下一个结点，继续遍历
       }
       return pmax->data;
   } 
   ```

   

9. __设计一个算法，删除递增有序表中值大于 mink 且小于 maxk（mink 和 maxk 是给定的两个参数，其值可以和表中的元素相同，也可以不同）的所有元素__

   ```c++
   void Delete_Min_Max(LinkList &L, int mink, int maxk)
   {
       //删除递增有序表 L 中值大于 mink 且小于 maxk 的所有元素
       p = L->next;
       while(p && p->data <= mink) //查找第一个值大于 mink 的结点
       {
           pre = p;
           p = p->next; 
       }
       while(p && p->data < maxk) //查找第一个值大于等于 maxk 的结点
    	    p = p->next;
       q = pre->next;
       pre->next = p; //修改待删除结点的指针
       while(q != p) //依次释放待删除结点的空间
       {
           s = q->next;
           free(q);
           q = s;
       }
   } 
   ```

   

10. __在一个递增有序的线性表中，有数值相同的元素存在。若存储方式为单链表，设计算法去掉数值相同的元素，使表中不再具有重复的元素。__

    【算法思想】 注意到题目是有序表，说明所有相同值域的结点都是相邻的。用 p 扫描递增单链 表 L，若*p 结点的值域等于其后继结点的值域，则删除后者，否则 p 移向下一个 结点。

```c++
void DeleteSame(LinkList &L)
{
    //L 是递增有序的单链表，本算法删除表中数值相同的元素
    LNode *p = L->next, *q; //p 为扫描工作指针
    if(p == NULL)
     return ;
    while(p->next != NULL)
    {
        q = p->next; //q 指向*p 的后继结点
        if(p->data == q->data) //找到重复值的结点
        {
            p->next = q->next; //释放 q 结点
            free(q);
        } 
        else
         p = p->next;
    } 
} 
```



11. __已知一个带有表头结点的单链表，结点结构为：__

| data | next |
| :--: | :--: |

__假设该链表只给出了头指针 list。在不改变链表的前提下，请设计一个尽可能 高效的算法，查找链表中 倒数第 k 个位置上的结点( k 为正整数)。若查找成 功， 算法输出该结点的 data 域的值，并返回 1；否则，只 返回 0。要求：__

【算法思想】 定义指针 p 和 q，初始化指针时均指向单链表的首元结点。首先将 p 沿链表移动 data link 到第 k 个结点，而 q 指针保持不变，这样当 p 移动到第 k+1 个结点时，p 和 q 所 指结点的间隔距离为 k。然后 p 和 q 同时向下移动，当 p 为 NULL 时，q 所指向 的结点就是该链表倒数第 k 个结点。

就是快慢指针 或者双指针

```c++
typedef struct LNode
{
     int data;
     struct LNode *next;
}LNode, *LinkList;

int Search_k(LinkList list, int k)
{
     //查找链表上第 k 个位置上的结点
     int i = 0; //初始化计数器
     p = q = list->link; //p，q 均指向首元结点
     while(p != NULL) //扫描链表，直到 p 为空
     {
         if(i < k)
             i++; //计数器+1
         else
             q = q->link; //q 移到下一个结点
             p = p->link; //p 移动到下一个结点
     }
     if(i == k)
     {
         cout << q->data; //查找成功，输出 data 域的值
         return 1;
     }
     else
     return 0; //如果链表长度小于 k，查找失败
}

```



12. __给定一个链表，判断链表中是否有环。如果有环，返回 1，否则返回 0。__

    __解法:__

    给定一个链表，判断链表中是否有环。如果有环，返回 1，否则返回 0。

```c++
int hasCycle(ListNode *head)
{ //判断链表是否有环
     if(head == NULL || head->next == NULL)
         return 0;
     ListNode *fast = head->next;
     ListNode *slow = head;
     while(slow != fast)
     {
         if(fast == NULL || fast->next == NULL) //链表无环
             return 0;
         slow = slow->next;
         fast = fast->next->next;
     }
     return 1;
}
```

13.  __删除线性链表中数据域为 item 的所有结点 算法思想：先从链表的第 2 个结点开始，从前往后依次判断链表中的所有结点是否满足条件，若某个 结点的数据域为 item，则删除该结点。最后再回过头来判断链表中的第 1 个结点是否满足条件，若 满足则将其删除。__

```c++
满足则将其删除。
void PurgeItem(LinkList &list) 
{ 
     LinkList p, q = list; 
     p = list->next; 
     while (p != NULL) 
     { 
         if (p->data == item) { 
             q->next = p->next; 
             free(p); 
             p = q->next; 
         } else { 
             q = p; 
             p = p->next; 
         } 
     } 
     if (list->data == item) 
     { 
         q = list; 
         list = list->next; 
         free(q); 
     } 
} 
```

14. __逆转线性链表__

可以用个dummy节点

```c++
void Reverse(LinkList &list) 
{ 
     LinkList p, q, r; 
     p = list; 
     q = NULL; 
     while (p != NULL) 
     { 
         r = q; 
         q = p; 
         p = p->next; 
         q->next = r; 
     } 
     list = q; 
} 
```

15. __制线性链表（递归）__

```c++
LinkList Copy(LinkList lista) 
{ 
     LinkList listb; 
     if (lista == NULL) 
         return NULL; 
     else { 
         listb = (LinkList)malloc(sizeof(LNode)); 
         listb->data = lista->data; 
         listb->next = Copy(lista->next); 
         return listb; 
     } 
} 
```







## 🍤__栈和队列__

1. __回文是指正读反读均相同的字符序列，如“abba”和“abdba”均是回文，但 “good”不是回文。试写一个算法判断给定字符序列是否是回文。（提示：将 一般字符入栈。）__

   ```c++
   int isPalindrome(char *t)
   {
       InitStack(S);
       len = strlen(t); //求字符串长度
       for(int i = 0; i<len/2; i++) //将一半字符入串
           Push(S,t[i]);
       if(len%2 != 0)
           i++; //长度为奇数，跳过中间字段
       while(!EmptyStack(S)) //每弹出一个字符与相应字符比较
       {
           char tmp = Pop(S);
           if(tmp != t[i])
            return 0; //不相等返回 0 
           else
            i++;
       }
       return 1; //比较完毕均相等返回 1 
   }
   
   ```

   2. __假设以数组 Q[m]存放循环队列的元素，同时设置一个标志域名 tag，以 tag ==  0 和 tag == 1 来区别队头指针（front）和队尾指针（rear）相等时，队列状态为 “空”还是“满”。试编写与此结构相应的插入（EnQueue）和删除（DeQueue） 算法。__

   【算法思想】 

   在循环队列中，增设一个 tag 类型的整型变量，进队时置 tag 为 1，出队时置 tag 为 0（因为入队操作可能导致队满，只有出队操作可能会导致队空）。队列 Q 初 试时，置 tag == 0，front == rear == 0。这样队列的 4 要素如下：

   __队空条件__：Q.front == Q.rear && Q.tag == 0 

   __队满条件__：Q.front == Q.rear && Q.tag == 1 

   __进队操作__：Q.data[Q.rear] = x; Q.rear = (Q.rear+1)%MaxSize; Q.tag = 1。 

   __出队操作__：x = Q.data[Q.front]；Q.front = (Q.front+1)%MaxSize ; Q.tag = 0;

```c++
//设 tag 法的循环队列入队算法
int EnQueue(SqQueue &Q, ElemType x)
{
    if(Q.front == Q.rear && Q.tag == 1) //两个条件都满足时则队满
         return 0; 
    Q.data[Q.rear] == x;
    Q.rear = (Q.rear+1)%MaxSize;
    Q.tag = 1;
    return 1; 
} 
//设 tag 法的循环队列出队算法
int DeQueue(SqQueue &Q, ElemType &x)
{
    if(Q.front == Q.rear && Q.tag == 0)
         return 0;
    x = Q.data[Q.front];
    Q.front = (Q.front+1)%MaxSize;
    Q.tag = 0;
    return 1;
} 
```

还有一种是留个空位置，rear 指向最后一个元素的下一个位置 这种情况下队满就是 (Q.rear+1)%MaxSize == Q.front

3. __设计一个算法判断输入的表达式中括号是否配对（假设只含有左、右圆括号）__

   ```c++
   bool Match(char exp[], int n)
   {
       int i = 0; char e;
       bool match = true;
       LinkStNode *st;
       InitStack(st); //初始化栈
       while(i < n && match)
       {
           if(exp[i] == '(') //当前字符为左括号，将其进栈
               Push(st,exp[i]);
           else if(exp[i] == ')') //当前字符为右括号
           {
               if(GetTop(st,e) == true) //成功取栈顶元素 e 
               {
                   if(e != '(') //栈顶元素不为 （ 时
                       match = false; //表示不匹配
                   else //栈顶元素为 ）时
                       Pop(st,e); //将栈顶元素出栈
               }
               else match = false; //无法取栈顶元素时表示不匹配
           }
           i++ //继续处理其他字符
       }
       if(!StackEmpty(st)) //栈不空时，表示不匹配
       	match = false;
       DestroyStakck(st);
       return match;
   }
   ```

   

## 🌮__二叉树__

 <font size=4em color='#9ed048'>先序遍历:</font> 

__递归型__

```C++
void PreOrder(BiTree T)
{
     if(T != NULL)
     {
         visit(T); //访问根结点
         PreOrder(T->lchild); //递归遍历左子树
         PreOrder(T->rchild); //递归遍历右子树
     }
}

```

__非递归型__

```c++
void PreOrder(BiTree T)
{
    InitStack(S);
    p = T;
    while(p || !StackEmpty(S))
    {
        if(p)
        {
            visit(p);
            push(S,p);
            p = p->lchild;
        }
        else
        {
            pop(S,p);
            p = p->rchild;
        }
    }
}
```

 <font size=4em color='#9ed048'>中序遍历:</font> 

__递归型__

```c++
void InOrder(BiTree T)
{
     if(T != NULL)
     {
         InOrder(T->lchild);
         visit(T);
         InOrder(T->rchild);
     }
}

```

__非递归型__

```c++
void InOrder(BiTree T)
{
    InitStack(S);
    p = T;
    while(p || !StackEmpty(S))
    {
        if(p)
        {
            push(S,p);
            p = p->lchild;
        }
        else
        {
            pop(S,p);
            visit(p);
            p = p->rchild;
        }
    }
}
```

 <font size=4em color='#9ed048'>后序遍历:</font> 

__递归型__

```c++
void PostOrder(BiTree T)
{
     if(T != NULL)
     {
         PostOrder(T->lchild);
         PostOrder(T->rchild);
         visit(T);
     }
}

```

__非递归型__

```c++
void PostOrder(TreeNode* root){
    vector<int> path;
    stack<TreeNode*> stk;
    TreeNode* pre=NULL;
    TreeNode* cur=root;
    while(cur!=NULL||!stk.empty()){
        while(cur!=NULL){
            stk.push(cur);
            cur=cur->left;
        }
        cur = stk.top();
        stk.pop();
        if(cur->right==NULL||cur->right==pre){ //如果该节点的右子树为空或者已经遍历过
            visit(cur);
            pre=cur;
            cur=NULL;
        }else{
            stk.push(cur);
            cur=cur->right;
        }
    }
}
```



__建立二叉树（从键盘输入数据，先序遍历递归算法）__

```c++
BTree CreateBT() 
{ 
     char ch; 
     BTree T; 
     sacnf("%c", &ch); 
     if (ch == ' ') 
         return NULL; 
     else { 
         T = (BTree)malloc(sizeof(BTNode)); 
         T->data = ch; 
         T->lchild = CreateBT(); 
         T->rchild = CreateBT(); 
         return T; 
     } 
} 
```

__建立二叉树（从数组获取数据）__

```c++
BTree CreateBT(int A[], int i, int n) 
{    //A是下标从1开始存数据的
     BTree p; 
     if (i > n) 
         return NULL; 
     else { 
         p = (BTree)malloc(sizeof(BTNode)); 
         p->data = A[i]; 
         p->lchild = CreateBT(A, 2*i, n); //完全二叉树的性质， i的左孩子下标是2*i 右孩子下标是 2*i+1
         p->rchild = CreateBT(A, 2*i+1, n); 
         return p; 
     } 
} 
T = CreateBT(A, 1, n); 
-------------------------------------------------------- 
BTree CreateBT(int A[], int n) 
{ 
     int i; 
     BTree *pT; 
     // 对应 n 个结点申请可容纳 n 个指针变量的内存空间
     pT = (BTree *)malloc(sizeof(BTree)*n); 
     // 若数组中的某个元素不等于零，则申请相应的结点空间并进行赋值
     for (i=1; i <= n; i++) 
     { 
         if (A[i] != 0) { 
             pT[i] = (BTree)malloc(sizeof(BTNode)); 
             pT[i]->data = A[i]; 
         } else { 
             pT[i] = NULL; 
         } 
     } 
     // 修改结点的指针域的内容，使父结点指向左、右孩子结点
     for (i=1; i <= n; i++) 
     { 
         if (pT[i] != NULL) 
         { 
             pT[i]->lchild = pT[2*i]; 
             pT[i]->rchild = pT[2*i+1]; 
         } 
     } 
} 
```











1. __从根节点到某个节点的路径__ （用后序遍历写）

   ```c++
   vector<int> getPath(TreeNode* root,int value){
       vector<int> path;
       stack<TreeNode*> stk;
       TreeNode* pre=NULL;
       TreeNode* cur=root;
       while(cur!=NULL||!stk.empty()){
           while(cur!=NULL){
               stk.push(cur);
               cur=cur->left;
           }
           cur = stk.top();
           if(cur->val==value){
               break;
           }
           stk.pop();
           if(cur->right==NULL||cur->right==pre){ //如果该节点的右子树为空或者已经遍历过
               pre=cur;
               cur=NULL;
           }else{
               stk.push(cur);
               cur=cur->right;
           }
       }
       while(!stk.empty()){
           path.push_back(stk.top()->val);
           stk.pop();
       }
       return path;
   }
   ```

   

2.  __二叉树的层序遍历算法__ （跟BFS类似）

    ```c++
    void LevelOrder(BiTree root)
    {
        InitQueue(Q); //初始化辅助队列
        BiTree p; 
        EnQueue(Q,root); //将根结点入队
        while(!IsEmpty(Q)) //队列循环不为空
        {
            DeQueue(Q,p); //队头元素出队
            visit(p); //访问当前 p 所指向结点
            if(p->lchild != NULL)
            	EnQueue(Q,p->lchild); //左子树不为空，左子树入队
            if(p->rchild != NULL)
            	EnQueue(Q,p->rchild); //右子树不为空，右子树入队
        } 
    }
    
    ```

3. __试编写二叉树的自下而上、从右到左的层次遍历算法。__

   ```c++
   void InvertLevel(BiTree root)
   {
       Stack S; 
       Queue Q;
       if(root != NULL)
       { //初始化栈和队列
           InitStack(S);
           InitQueue(Q);
           EnQueue(Q,root);
           while(IsEmpty(Q) == false) //从上而下层次遍历
           {
               DeQueue(Q,p);
               visit(p);
               Push(S,p); //出队，入栈
               if(p->lchild)
                   EnQueue(Q,p->lchild); //左子树不为空，左子树入队
               if(p->rchild)
                   EnQueue(Q,p->rchild); //右子树不为空，右子树入队
           }
       }
   } 
   ```

4. __计算二叉树的最大宽度（二叉树的最大宽度是指二叉树所有层中结点个数 的最大值）。__

   __解法：__ 可以用层次遍历，每层统计节点个数就行

   ```c++
   int MaxWidth(BiTree root)
   {
       Stack S; 
       Queue Q;
       int res=0;
       //求二叉树的最大宽度
       if(root == NULL){
           return 0;
       }else{
           InitStack(S);
           InitQueue(Q);
           EnQueue(Q,root); //先将根入队
           while(!isEmpty(Q)){
               int size=Q.size();//获取当前队列内的元素个数 也就是当前层的节点个数
               res = Max(size,res);
               for(int i=0;i<size;i++){
                   TreeNode* node = Q.front();
                   Q.pop();
                   if(node->left)
                       Q.push(node->left);
                   if(node->right)
                       Q.push(node->right);
               }
           }
       } //else
       return res;
   }
   
   ```

5. __设二叉树采用二叉链表的存储结构，试着编写非递归算法二叉树的最大 高度（二叉树的最大宽度是指二叉树所有层中结点个数的最大值）。__

   __解法__: 用层次遍历 或者说 BFS ，齐头并进，每过一层高度加 1 ,与上面那题模板通用

   ```c++
   int MaxDepth(BiTree root)
   {
       Stack S; 
       Queue Q;
       int res=0; //res 记录最终二叉树的最大高度
       if(root == NULL){
           return 0;
       }else{
           InitStack(S);
           InitQueue(Q);
           EnQueue(Q,root); //先将根入队
           while(!isEmpty(Q)){
               int size=Q.size();//获取当前队列内的元素个数 也就是当前层的节点个数
               for(int i=0;i<size;i++){
                   TreeNode* node = Q.front();
                   Q.pop();
                   if(node->left)
                       Q.push(node->left);
                   if(node->right)
                       Q.push(node->right);
               }
               res++;
           }
       } //else
       return res;
   }
   ```

   

6. __假设二叉树采用二叉链存储结构存储，试设计一个算法，计算一棵给定二叉 树的所有节点数。__

   ```c++
   int Nodes(BTNode *b)
   { 
       int num1,num2;
       if (b==NULL)
           return 0;
       else
       { 
           num1=Nodes(b->1child);
           num2=Nodes(b->rchild) ;
           return (numl+num2+1) ;
       }
   }
   ```

7. __假设二叉树采用二叉链存储结构存储，设计一个算法计算一棵给定二叉 树的所有叶子节点个数。 __

```c++
int LeafNodes(BTNode *b)
{
    int num1,num2;
    if (b == NULL)
        return 0；
    else if(b->1child==NULL && b->rchild==NULL)
        return 1;
    else
    { 
         num1=LeafNodes(b->1child);
         num2=LeafNodes(b->rchild);
         return(num1+num2);
    }
}

```

8. __假设二叉树采用二叉链存储结构存储，设计一个算法计算一棵给定二叉树的 所有双分支节点。 __

   ```c++
   int DSonNodes(BTNode *b)
   {
        int num1,num2,n;
        if (b==NULL)
            return 0;
        else if (b->1child==NULL || b->rchild==NULL)
            n=0;
                //为单分支或叶子节点时，不计 
        else
            n=1; //为双分支节点时，计 1 
        num1=DSonNodes(b->1child); //递归求左子树的双分支节点数
        num2=DSonNodes(b->rchild); //递归求右子树的双分支节点数
        return (num1+num2+n);
   }
   
   ```

9. __假设二叉树采用二叉链存储结构存储，所有节点的值为正整数，设计 一个算法求所有节点值之和。 __

   ```c++
   int FindSum(BTNode *b)
   { 
       if(b==NULL) 
           return 0;
       else
           return (b->data + FindSum(b->lchild)+FindSum(b->rchild));
   }
   
   ```

10. __假设二叉树采用二叉链存储结构存储，设计一个算法求其中节点值为 x 的节点个数。__

```c++
int FindCount(BTNode *b,ElemType x)
{
    if(b==NULL) 
    return 0; 
    else if(b->data == x)
        return (1+FindCount(b->lchild,x) + FindCount(b->rchild,x)); 
    else return (FindCount(b->lchild,x) + FindCount(b->rchild,x));
}

```

11. __假设二叉树采用二叉链表存储结构，设计一个递归算法求二叉树的高度__

```c++
int BTNodeDepth (BTNode *b)
{
     int lchilddep, rchilddep;
     if (b==NULL)
        return(0); //空树的高度为 0
     else
     {
        childdep=BTNodeDepth(b->lchild); //求左子树的高度为 lchilddep
        rchilddep-BTNodeDepth(b->rchild); //求右子树的高度为 rchi lddep
        return (lchilddep > rchilddep) ? (lchilddep+1) : (rchilddep+1);
     }
}

```

12. __假设二叉树采用二叉链存储结构存储，设计一个算法，求先序遍历序列中第 k(1≤k≤二叉树中节点个数)个节点的值。 __

```c++
int n=1; //全局变量
ElemType PreNode(BTNode *b,int k)
{
     ElemType ch;
     if (b==NULL)
         return' ';
     if (n==k)
         return(b->data);
     n++;
     ch=PreNode(b->lchild,k); //遍历左子树
     if(ch!=' ')
         return(ch); //在左子树中找到后返回
     ch=PreNode(b->rchild,k); //遍历右子树
     return(ch); //返回右子树中的遍历结果
}

```

13. __假设二叉树采用二叉链存储结构存储，设计一个算法，求中序遍历序列中第 k(1≤k≤二叉树中节点个数)个节点的值。__

```c++
int n=1; //全局变量
ElemType InNode (BTNode *b, int k)
{ 
     ElemType ch;
     if (b==NULL)
         return' ’;
     ch=InNode(b->lchild,k); //遍历左子树 
     if (ch!=' ') //在左子树找到了便返回 ch
         return ch;
     else
     {
        if (n==k)
             return b->data;
        n++;
     	return InNode(b->rchild,k); //返回在右子树中查找的结果
    }
}

```

14. __假设二叉树采用二叉链存储结构存储，设计一个算法，求后序遍历序列中第 k(1≤k≤二叉树中节点个数)个节点的值。__

```c++
int n=1; //全局变量
ElemType PostNode(BTNode *b,int k)
{
     ElemType ch;
     if (b==NULL)
         return ' ';
     ch=PostNode(b->1child,k); //遍历左子树
     if (ch!=' ') //在左子树找到了便返回 ch
         return ch;
     else
     {
         ch=PostNode(b->rchild,k); //遍历右子树
         if (ch!=' ') //在右子树找到了便返回 ch
             return ch;
         if (n==k)
             return b->data;
         n++;
     }
}

```

15. __【2014 年统考真题】二叉树的带权路径长度（WPL）是二叉树中所有结点的 带权路径长度之和。给定一棵二叉树 T，采用二叉链表存储，结点结构为__

| left | weight | right |
| :--: | :----: | :---: |

__其中叶结点的 weight 域保存该结点的非负权值。设 root 为指向 T 的根结点的指 针，请设计求 T 的 WPL 的算法。__

【算法思想】DFS 

```c++
int WPL_PreOrder(BiTree root, int deep)
{
    static int wpl = 0; //定义一个 static 全局变量存储 wpl
    if(root->lchild == NULL && root->rchild == NULL)
        wpl = wpl + deep*root->weight; //为叶子结点直接累计 wpl
    if(root->lchild != NULL)
        wpl_PreOrder(root->leight, deep+1);
    if(root->rchild != NULL)
        wpl_PreOrder(root->rchild, deep+1);
    return wpl; 
}

```

16. __【2017 年统考真题】设计一个算法，将给定的表达式树（二叉树）转换为等价的中缀表达式（通过括号反映操作符的计算次序）并输出。例如，当下列的两 棵表达式树作为算法的输入时：__

![16年真题](C:/Users/asus/Desktop/考研/Image/16年真题.png)

__输出等价的中缀表达式分别为（a+b）* （c * （ -d））和（a*b）+（-（c-d））__

【算法思想】树的中序遍历

```c++
void BtreeToExp(BTree *root, int deep)
{
    if(root == NULL)
    	 return ;	
    else if(root->left == NULL && root->right == NULL) //若为叶子结点
    	 printf("%s", root->data); 
    else
    {
         if(deep > 1)  //如果deep > 1 说明有子表达式 
             printf("("); //若有子表达式则加 1 层括号
         BtreeToExp(root->left, deep+1);
         printf("%s", root->data);
         BtreeToExp(root->right, deep+1);
         if(deep > 1)
             printf("）"); ////若有子表达式则加 1 层括号 
    } 
} 
```

17. __求二叉树的深度（递归算法）__

```c++
7. 求二叉树的深度（递归算法）
int Depth(BTree T) 
{ 
     int ldepth, rdepth; 
     if (T == NULL) 
         return 0; 
     else { 
         ldepth = Depth(T->lchild); 
         rdepth = Depth(T->rchild); 
         if (ldepth > rdepth) 
             return ldepth+1; 
         else 
             return rdepth+1; 
     } 
} 
```

18. __求二叉树的深度（非递归算法）__

【算法思想】

对二叉树进行遍历，遍历过程中依次记录各个结点所处的层次数以及当前已经访问过的 结点所处的最大层次数。每当访问到某个叶子结点时，将该叶子结点所处的层次数与最大层次数进 行比较，若前者大于后者，则修改最大层次数为该叶子结点的层次数，否则不作修改。遍历结束时， 所记录的最大层次数即为该二叉树的深度。本算法使用的是非递归的中序遍历算法（其它遍历顺序 也可以）。

```c++
#define MAX_STACK 50 
int Depth(BTree root) 
{ 
    // BTree STACK1[MAX_STACK], p = root; 
    // int STACK2[MAX_STACK]; 
     BTree p = root;
     Stack<int> stk2;
     Stack<BTree> stk1;
     int curdepth, maxdepth = 0, top = -1; 
     if (root != NULL) 
     { 
         curdepth = 1; 
         while (p != NULL || !stk1.empty()) 
         { 
             while (p != NULL) 
             { 
                 stk1.push(p);
                 stk2.push(curdepth);
                 p = p->lchild; 
                 curdepth++; 
             } 
             p = stk1.top(); 
             curdepth = stk2.top();
             stk1.pop();stk2.pop();
             if (p->lchild == NULL && p->rchild == NULL) 
                 if (curdepth > maxdepth) 
                     maxdepth = curdepth; 
             p = p->rchild; 
             curdepth++; 
         } 
     } 
     return maxdepth; 
} 
```

19. __交换二叉树中所有结点的左右子树的位置__

```c++
void ExchangeBT(BTree root) 
{ 
	if(root==null) return;
    ExchangeBT(root.lchild);
    ExchangeBT(root.rchild);
    BTree tmep = root.lchild;
    root.lchild=root.rchild;
    root.child=temp;   
    
} 
```







## 🍯图

__引言__：图算法设计有一定的难度，要提高这块的设计能力，要掌握如下基本结构:

__①图的两种存储结构。图算法都是基于某种存储结构的，如果连存储结构都含糊不清楚，肯 定是设计不出来的，因此务必去备注图的邻接矩阵和邻接表的存储结构__ 

__②图的两种遍历算法。图的算法基本都是基于图的遍历算法（正如二叉树的算法是基于二叉 树的 3 种基本遍历算一样）。一般涉及不带权图的最短或最长路径时可以考虑采用广度优 先遍历算法；而涉及到查找所有简单路径时可考虑采用深度优先遍历算法。__



 <font size=4em color='#9ed048'>Floyd算法:</font> （可以得到任意两点的最短路径）

Floyd算法比较简单，在算最短路径的时候写就完事了,时间复杂度 O(n^2^)

```c++
#include <iostream>
#include<bits/stdc++.h>
#define MaxVnum 100 //顶点最大个数
typedef char VexType; //顶点的数据类型，根据需要定义
typedef int EdgeType; //边上的权值的数据类型，若不带权值的图，则为0或1
typedef struct{
    VexType Vex[MaxVnum];
    EdgeType Edge[MaxVnum][MaxVnum];
    int vexnum,edgenum;
}AMGragh;
int dist[MaxVnum][MaxVnum];
int pre[MaxVnum][MaxVnum];

void Floyd(AMGragh G){
    for(int i=0;i<G.vexnum;i++){
        for(int j=0;j<G.vexnum;j++){
            dist[i][j] = G.Edge[i][j];
            if(dist[i][j]!=INF&&i!=j){//如果两不同节点有边
                pre[i][j]=i;//设置前驱
            }else{
                pre[i][j]=-1;
            }
        }
    } //

    for(int k=0;k<G.vexnum;k++){
        for(int i=0;i<G.vexnum;i++){
            for(int j=0;j<G.vexnum;j++){
                if(dist[i][j]>dist[i][k]+dist[k][j]){ //插入个顶点看是否能松弛
                    dist[i][j]=dist[i][k]+dist[k][j];
                    pre[i][j]=pre[k][j];
                }
            }
        }
    }
}
```



 <font size=4em color='#9ed048'>Dijkstra算法: </font> （用来解决单源最短路径问题）

不能解决带有负权值的图的单源最短路径

```c++
#include <iostream>
#include<bits/stdc++.h>
#define MaxVnum 100 //顶点最大个数
typedef char VexType; //顶点的数据类型，根据需要定义
typedef int EdgeType; //边上的权值的数据类型，若不带权值的图，则为0或1
typedef struct{
    VexType Vex[MaxVnum];
    EdgeType Edge[MaxVnum][MaxVnum];
    int vexnum,edgenum;
}AMGragh;
int dist[MaxVnum];
int p[MaxVnum];
bool flag[MaxVnum];

void dijkstra(AMGragh G,int u){
    for(int i=0;i<G.vexnum;i++){ //初始化
        dist[i] = G.Edge[u][i];
        flag[i]=false;
        if(dist[i]==INF){
            p[i]=-1; //源点到i节点没直接路径,前驱设为-1
        }else{
            p[i]=u;
        }
        for(int i=0;i<G.vexnum;i++){
            int temp=INF,t=u;
            for(int j=0;j<G.vexnum;j++){
                if(!flag[j]&&dist[j]<temp){
                    t=j;
                    temp=dist[j];
                }
            }
        }
        if(t==u) return ;
        flag[t]=true;
        for(int i=0;i<G.vexnum;i++){
            if(!flag[i]&&G.Edge[t][j]<INF){
                if(dist[i]>dist[t]+G.Edge[t][i]){
                    dist[i]=dist[t]+G.Edge[t][i];
                    p[i]=t;
                }
            }

        }
    }
}
```













1. __设计一个算法，判断一个无向图 G 是否为一棵数。若是一棵树，则算法返回 true，否则返回 false.__

__【算法思想】__

一个无向图 G 是一棵数的条件，G 必须是无回路的连通图或有 n-1 条边的连通图。 这里采用后者作为判断条件。采用深度优先遍历算法在遍历图的过程中统计可能 访问到的顶点个数和边的个数，若一次遍历就能访问到 n 个顶点和 n-1 条边，则 可断定，此图是一课数，算法如下：

```c++
bool isTree(Graph &G)
{
    for(i = 0; i<G.vexnum; i++)
    	visited[i] = FALSE; //访问标记数组初始化
    int Vnum = 0, Enum = 0; //初试化顶点数和边数
    DFS(G,1,Vnum,Enum,visited);
    if(Vnum == G.vexnum && Enum == (G.vexnum-1)) 
    	return true; //符合树的条件
    else
    	return false; 
}
void DFS(Graph &G, int v, int &Vnum, int &Enum, int visited[])
{
    //深度优先遍历
    visited[v] = TRUE; Vnum++; //做标记访问，顶点计数
    int w = FirstNeighbor(G,v);
    while(w!=-1)
    {
        if(!visited[w]){
            Enum++; //如果邻接顶点没访问过，则边加一
            DFS(G,w,Vnum,Enum,visited);    
        }
        w = NextNeighbor(G,v,w);
    } 
} 
```



2. __写出图的深度优先搜索 DFS 的非递归算法（图采用邻接表存储形式）。__

【算法思想】 

在深度优先遍历的非递归算法中适用一个栈来记忆下一步将要访问的顶点，同时 适用了一个访问标记数组 visited[i]来记忆第 i 个顶点是否在栈内。

```c++
void DFS_NonRC(Graph &G, int v)
{
    //从顶点开始进行深度优先搜索
    int w;
    InitStack(S);
    for(i = 0; i<G.vexnum; i++)
    	visited[i] = FALSE; //初始化 visited 
    Push(S,v);
    visited[v] = TRUE; //将 v 入栈并置为 true 
    while(!IsEmpty(S))
    {
        k = Pop(S); //栈中退出一个顶点
        visit(k); //先访问，再将其子结点入栈
        for(w = FirstNeighbor(G,k) ; w>=0; w = NextNeighbor(G,k,w))
        { //k 的所有邻接点
            if(!visited[w]) //未进过栈的顶点进栈
            {
                Push(S,w);
                visited[w] = true; //标志
            }//if 
        }//for
    } //while
}

```

3.  __分别采用基于深度优先遍历和广度优先遍历算法判别以邻接表方式存储的 有向图 中是否存在有顶点 Vi 到顶点 Vj 的路径（i≠j）。__

【算法思想】

 两个不同的遍历算法都采用从顶点 Vi 出发，依次遍历图中的每个顶点，直到搜索到顶点 Vj，若能够搜索到 Vj，则说明存在顶点 Vi 到顶点 Vj 的路径。

```c++
bool visited[MaxSize] = false; //访问标记数组
int Exit_Path_DFS(ALGraph G, int i, int j)
{
    int p; //顶点序号
    //深度优先遍历判断有向图 G 中顶点 Vi 到 Vj 是否有路径，是则返回 1，否则返回 0
    if(i == j)
    	return 1; //i 就是 j 的时候
    else
    {
        visited[i] = 1; //置访问标记
        for(p = FirstNeighbor(G,i); p>=0; p = NextNeighbor(G,i,p))
        {
//            k = p->adjvex; 
            if(!visited[p] && Exist_Path_DFS(G,p,j))
                return 1;
        } 
    } 
    return 0;
} 
```



4. __设计一个算法，求不带权无向连通图 G 中距离顶点 v 最远的一个顶点（所谓 最远就是到大 v 的路径长度最大）__

【算法思想】

基于图的广度优先搜索遍历方式，其体现了图中由某个顶点开始，以近向远扩展 的方式遍历图中结点的过程。因此广度优先搜索遍历过程的最后一个顶点一定是 距离给定顶点最远的顶点。因此只需要把广度优先遍历搜索的代码背下，稍加修 改，返回最后一个顶点即可。

```c++
#define MaxVnum 100 //顶点最大个数
typedef char VexType; //顶点的数据类型，根据需要定义
typedef int EdgeType; //边上的权值的数据类型，若不带权值的图，则为0或1
typedef struct AdjNode{
    int index; //邻接点下标
    struct AdjNode *next; //邻接点的下一个邻接点
}AdjNode;

typedef struct VexNode{
    VexType data; //顶点数据类型
    AdjNode *first; //指向第一个邻接点
}VexNode;

typedef struct{
    VexNode Vex[MaxVnum];
    int vexnum,edgenum;
}ALGragh;


int maxdist (AGraph *G, int v)
{ 
    AdjNode *p;
	Queue Q;
    int visited[MAXV],i,j,k;
    k = v;
    for(i=0;i<G->n;i++) //初始化访问标志数组
        visited[i]=0;
    visited[v]=1; //标记 v 已访问
	Init(Q);
    Q.push(v);
    while (!isEmpty(Q))
    { 
		k = Q.front(); 
        Q.pop();
        p=G->Vex[k].first; //找第 1 个邻接点
        while (p!=NULL) //所有未访问过的邻接点进队
        { 
            j=p->index; //获取邻接顶点下标
            if (visited[j]==0) //若 j 未访问过
            { 
                visited[j]=1; //将顶点 j 进队
                Q.push(j);
            }
            p=p->next; //找下一个邻接点
        }
    }
    return k; //k是最后一个访问的节点的下标
}

```



5. __假设图采用邻接表存储，分别写出基于 DFS 和 BPS 遍历的算法来判别顶点 i 和顶点 j (i≠j）之间是否有路径。__

【算法思想】

 先置全局数组 visited[]所有元素为 0，然后从顶点 i 开始进行某种遍历，遍历 结束之后，若 visited[j]=0，说明顶点 i 与顶点 j 之间没有路径;否则说明它们 之间存在路径。

```c++
//基于 DFS 遍历的算法如下：
int visited[Maxnum];
int DFSTrave(ALGraph *G, int i,int j)
{ 
    int k;
    for (k=0;k<G->vexnum;k++)
        visited[k]=0;
    DFS(G,i); //从顶点 i 开始进行深度优先遍历
    if(visited[j]==0)
        return 0;
    else
        return 1;
}

void DFS(ALGragh *G,int i){
    visited[i]=true;
	int p;
    for(p=firstNeighbor(G,i);p>=0;p=nextNeighbor(G,i,p)){
		if(visited[p]==0){
            visited[p]=1;
            DFS(G,p);
        }       
    }
}

//基于 BFS 遍历的算法如下：
int BFSTrave(ALGraph *G,int i, int j)
{ 
    int k;
    for ( k=0;k<G->n;k++)
        visited[k]=0;
    BFS(G,i); //从顶点 i 开始进行广度优先遍历
    if (visited[j]==0)
        return 0;
    else
        return 1;

}

void BFS(ALGragh *G,int i){
    Queue Q;
    Init(Q);
    Q.push(i);
    while(!isEmpty(Q)){
        int k = Q.front();
        int p;
        Q.pop();
        for(p=firstNeighbor(G,k);p>=0;p=nextNeighbor(G,k,p)){
            if(visited[p]==0){
                visited[p]=1;
                Q.push(p);
            }
        }
    }
}

```



6. __假设图 G 采用邻接表存储，设计一个算法，判断无向图 G 是否连通。若连通 则返回 1;否则返回 0。__

【算法思想】:

采用遍历方式判断无向图 G 是否连通。若用深度优先遍历方法，先给 visited[] 数组置初值 0，然后从 0 顶点开始遍历该图。在一次遍历之后，若所有顶点 i 的 visited[i]均为 1，则该图是连通的;否则不连通。对应的算法如下。 跟上面那题类似

```c++
int visited[Maxnum];
void DFS(ALGragh *G,int i){
    visited[i]=true;
	int p;
    for(p=firstNeighbor(G,i);p>=0;p=nextNeighbor(G,i,p)){
		if(visited[p]==0){
            visited[p]=1;
            DFS(G,p);
        }       
    }
}

int Connect (ALGraph *G) //判断无向图 G 的连通性
{ 
    int i,flag=1;
    for (i=0;i<G->n;i++)
        visited[i]=0;
    DFS(G,0); //调用 DFS 算法
    for (i=0;i<G->n;i++)
        if (visited[i]==0)
        { 
            flag=0;
            break;
        }
    return flag;
}
```

7. __假设图 G 采用邻接表存储，设计一个算法，判断图 G 中从顶点 u 到 v 是否存 在简单路径。__

【算法思想】 DFS深搜遍历路径

```c++
#define MaxVnum 100 //顶点最大个数
typedef char VexType; //顶点的数据类型，根据需要定义
typedef int EdgeType; //边上的权值的数据类型，若不带权值的图，则为0或1
typedef struct AdjNode{
    int index; //邻接点下标
    struct AdjNode *next; //邻接点的下一个邻接点
}AdjNode;

typedef struct VexNode{
    VexType data; //顶点数据类型
    AdjNode *first; //指向第一个邻接点
}VexNode;

typedef struct{
    VexNode Vex[MaxVnum];
    int vexnum,edgenum;
}ALGragh;


void ExistPath (AGraph *G,int u,int v,int &has)
{ //has 表示 u 到 v 是否有路径,初值为 0
    int w;
    ArcNode *p;
    visited[u]=1; //置已访问标记
    if (u==v) //找到了一条路径
    { 
        has=1;
        return;
    }
    p=G->Vex[u].first; //p 指向顶点 u 的第一个相邻点
    while (p!=NULL)
    { 
        w=p->index; //w 为顶点 u 的相邻顶点 
        if(visited[w] ==0) //若 w 顶点未访问，递归访问它
            ExistPath(G, w, v, has);
        p=p->next; //P 指向顶点 v 的下一个相邻点
    }
}

```

8. __假设图 G 采用邻接表存储，设计一个算法，输出图 G 中从顶点 u 到 v 的所有简单路径。__

```c++
void FindPath(AGraph *G,int u,int v,int path[],int d)
//d 是到当前为止已走过的路径长度,调用时初值为-1
{ 
    int w,i;
    AdjNode *p;
    d++; //路径长度增 1
    path[d] =u; //将当前顶点添加到路径中
    visited[u] =1; //置已访问标记
    if (u == v) //找到一条路径则输出
        printf("%2d" , path[i]); //输出路径
    p=G->Vex[u].first; //p 指向 v 的第一个相邻点
    while (p!=NULL)
    { 
        w=p->next->v; //w 为顶点 p 的相邻顶点
        if(visited[w]==0) //若 w 顶点未访问,递归访问它
            FindPath(G, w,v , path, d);
        p=p->next; //p 指向 v 的下一个相邻点
    }
    visited[u]=0; //恢复环境,使该顶点可重新使用
}

```

9. __假设图 G 采用邻接表存储，设计一个算法，判断无向图 G 中任意两点之间是 否存在一条长度为 k 的简单路径__

【算法思想】 

可以利用深度优先搜索的算法递归遍历邻接表来进行判断。设置 visited[]为标记 访问数组，已经访问的顶点记为 true。该算法每递归调用一次，长度 k-1，递归 结束的条件为首尾顶点相遇且 k==0，此时表面两个顶点之间存在一条长度为 k 的简单路径，返回 1。如果递归结束的条件不成立，则从 vi 的边链表的第一个边 界点开始，获取 vi 的邻接点，对 vi 的尚未访问的邻接点递归调用，长度 k-1。如 果最后递归结束的条件不成立且无法继续递归下去，并不两点之间不存在长度 k 的简单路径，返回 0。

```c++
#define MaxVnum 100 //顶点最大个数
typedef char VexType; //顶点的数据类型，根据需要定义
typedef int EdgeType; //边上的权值的数据类型，若不带权值的图，则为0或1
typedef struct AdjNode{
    int index; //邻接点下标
    struct AdjNode *next; //邻接点的下一个邻接点
}AdjNode;

typedef struct VexNode{
    VexType data; //顶点数据类型
    AdjNode *first; //指向第一个邻接点
}VexNode;

typedef struct{
    VexNode Vex[MaxVnum];
    int vexnum,edgenum;
}ALGragh;


int visited[MaxSize];
bool PathLenK(ALGraph G, int i, int j, int k)
{
    if(i == j && k == 0) //找到一条路径符合要求
    	return true;
    else if(k > 0)
    {
        visited[i] = true; //防止出现环,导致死循环
        for(p = G.Vex[i].first; p; p = p->next) //next 表示 i的相对于p的下一个邻接点
        {
            //从结点 i 开始遍历，p 为 i 的边链表的第一个边结点
            v = p->index; //v表示p的下标
            if(!visited[v]) //v 未被访问
                if(PahtLenK(G,v,j,k-1)) 
                    return true; 
        }
        visited[i] = false; //允许曾经被访问过的结点出现在另外一条路径上 
    }
    return false;
} 
```



## 🥗__串__

 <font size=4em color='#9ed048'>KMP:</font> 

```c++
#include <iostream>
#include "bits/stdc++.h"
using namespace std;
const int MAXN = 1000 + 5;
char str[MAXN],pattern[MAXN];
int Next[MAXN];
int cnt;

void getNext(char *p){ //获取以0为下标起点的Next数组
    int len = strlen(p);
    Next[0]=0;Next[1]=0;
    for(int i=1;i<len;i++){ //用i来求i+1的next
        int k = Next[i]; //用第i个字符的失配点来找下一个字符的失配点
        while(k&&p[i]!=p[k]) k=Next[k];  //找失配点,跳出后看失配点是否为0
        Next[i+1] = (p[i]==p[k])?k+1:0;
    }
}
void KMP(char *s,char *p){
    int slen = strlen(s),plen = strlen(p);
    getNext(p);
    int k=0;
    for(int i=0;i<slen;i++){
        while(k&&s[i]!=p[k]) k = Next[k]; //一直更新失配点直到 s[i] = p[k] 或者 k==0 ,也就是k 回退
        if(s[i]==p[k]) k++; //能匹配上则模式串指针往后移一位
        if(k==plen){
            cout << "找到匹配的位置: " << i+1-plen << endl;
        }
    }
}
```



## 🎃查找和排序

1. __折半查找非递归算法（二分查找）__

```c++
int Binary_Search(SqList L, ElemType key)
{
     //在有序表 L 中查找关键字为 Key 的元素，若存在则返回其他位置，不存在则返回-1
     int left = 0, right = L.length-1, mid;
     while(left <= right) //闭区间[0,len-1] 出循环条件 [high,low]
     {
         mid = (left + right)/2; //取中间位置
         if(L.elem[mid] == key)
             return mid; //查找成功返回所在位置
         else if(L.elem[mid] > key)
             right = mid-1; //从前半部分继续查找
         else
             left = mid+1; //从后半部分继续查找
     }
     return -1;
}

```

2. __折半查找递归算法__

```c++
int BinSearch_Cur(SqList L, KeyType key, int low, int high)
{
     if(low > high)
     return 0; //查找不到时返回 0；
     if(low <= high)
     {
         mid = (low+high)/2;
         if(L.elem[mid] == key)
             return mid;
         else if(key < L.elem[mid])
             return BinSearch_Cur(L, key, low, mid-1); //对左子表递归查找
         else
             return BinSearch_Cur(L, key, mid+1, high); //对右子表递归查找
     }
}

```

3. __试着写一个算法判断二叉树是否为二叉排序树的算法__

【算法思想】

根据二叉排序树的定义，对二叉树进行递归遍历，左子树关键字比根结点关键字 小，右子树的关键字比根结点的关键字大，一旦有不满足条件则可判断不是二叉 排序树。 通过参数 flag 的值来判断，flag 为 1 表示是二叉排序树，为 0 则表示非二叉排序 树，flag 初值为 1。设定全局变量 pre(初始值为 NULL)来指向遍历过程结点的前 驱。

用中序遍历来判断

```c++
void JudgeBST(BiTree root, int &flag)
{
    //判断二叉树是否为二叉排序树
    if(root != NULL && flag)
    {
        JudgeBST(T->lchild, flag); //中序遍历左子树
        if(pre == NULL) //中序遍历的第一个结点不必判断
            pre = root; 
        else if(pre->data < root->data) //判断当前节点的前驱节点的值 是否 < 当前节点的值 ,因为二叉排序树的中序遍历是递增的(一般是递增的)
            pre = root; //前驱指针指向当前结点
        else flag = 0; //不是二叉排序树
        JudgeBST(T->rchild, flag); //中序遍历右子树
    } 
}
```



> 记住二叉树中序遍历模板 其他两个类似
>
> travel( root.left );
>
> ​		做操作
>
> travel( root.right );



4.  __快速排序算法__

```c++
int Partition(SqList &L, int low, int high)
{
    //L.r[0] = L.r[low]; 
    int temp = L.r[low];//用子表的第一个记录作为枢纽记录
    pivotkey = L.r[low].key; //枢纽记录关键字
    while(low < high)
    {
        while(low < high && L.r[high].key >= pivotkey)
        	--high; //右边走到第一个小于 pivotkey 的地方
        L.r[low] = L.r[high]; //将比枢纽记录小的移动到低端
        while(low < high && L.r[low].key <= pivotkey)
            ++low;  //左边找第一个大于 pivotkey 的地方
        L.r[high] = L.r[low]; //将比枢纽记录大的移动到高端
    }
//    L.r[low] = L.r[0]; 
  	L.r[low] = temp;
    return low; //返回枢纽位置
}

void QSort(SqList &L, int low, int high)
{
    if(low < high)
    {
        pivotloc = Partition(L, low, high); //第一步先分左右 ，左边全是小于pivot的值，右边全是大于pivot的值
        QSort(L,low,pivotloc-1);
        QSort(L,pivotloc+1, high);
    }
} 
```

<font size=4em color='8d4bbb'>点评：</font>在各种内部排序中，快速排序可谓是相当经典的排序算法，因此，快速 排序算法是大家必须中重点掌握了理解的。下面给大家挑选了两道都是采用快 速排序算法进行解答的题目

__例题【快排的应用】：编写算法，对 n 个关键字取整数值的记录序列进行整理， 以使得所有关键字为负值的关键字排列在关键字为非负值的记录之前，__

要求： 

（1）采用顺序存储结构，至多使用一个记录的辅助存储空间 

（2）算法的时间复杂度为 O(n)

【算法思想】 

此题目借助快速排序中子表划分的算法思想对表中的数据进行划分。附设两个指 针 low 和 high，初始时分别指向表的上界和下界。

```c++
void process(int a[], int n)
{
    int low = 0, high = n-1;
    while(low < high)
    {
        while(low < high && a[low] < 0)
         	++low;
        while(low < high && a[high] > 0)
        	--high;
        if(low < high)
        {
            int tmp = a[low];
            a[low] = a[high]; //交换
            a[high] = tmp;
            low++;
            high--;
     	}
    }
}

```



__【变式例题】设有一组初始记录关键字序列（K1，K2，…，Kn），要求设计一个算法能够在 O(n)的时间复杂度内将线性表划分成两部分，其中左半部分的每 个关键字均小于 Ki，右半部分的每个关键字均大于等于 Ki。__

```c++
void process(int a[], int n, int w)
{
    int low = 0, high = n-1, x = k[w];
    while(low < high)
    {
        while(low < high && a[low] < x)
             ++low;
        while(low < high && a[high] > x)
             --high;
        if(low < high)
         {
            int tmp = a[low]; 
            a[low] = a[high]; //进行交换
            a[high] = tmp;
            low++;
            high--;
         }
    }
}

```



5. __线性表（a1,a2,a3,…,an）中元素递增有序且按照顺序存储于计算机内。__

   要求设 计一个算法完成：

   （1）用最少的时间在表中查找数值为 x 的元素。 // 注意递增有序，用二分查找 

   （2）若查找到将其与后继元素位置交换。  

   （3）若找不到将其插入表中并使表中元素仍然递增有序。 

   【算法思想】 顺序存储的线性表递增有序，可以顺序查找，也可以折半查找。题目要求采用“最 少的时间在表中查找数值为 x 的元素”，应使用折半查找，算法如下：

```c++
void SearchExchageInsert(ElemType a[], ElemType x)
{
     int low = 0, high = n-1; //low 和 high 指向线性表下界和上界
     while(low <= high) //注意是闭区间,[0,n-1] ，注意区间就能很好判断跳出循环的条件
     {
         mid = (low + high)/2;
         if(a[mid] == x) //查找到 x，退出循环
             break;
         else if(a[mid] < x)
             low = mid + 1;
         else
             high = mid - 1;
     }
     if(a[mid] == x && mid != n) //若最后一个元素与 x 相等，则不存在
     { 
         //将其与后继交换
         int tmp = a[mid];
         a[mid] = a[mid+1];
         a[mid+1] = tmp;
     }
     if(low > high) // 查找失败，需要插入元素
     {
         for(i = n-1; i>high; i--)
             a[i+1] = a[i]; //后移元素
         a[i+1] = x; //插入 x
     }
}
```

 <font size=4em color='#9ed048'>插入排序算法:</font> 

```c++
void InsertSort(int A[], int n) 
{ 
     int i, j, temp; 
     for (i=1; i <= n-1; i++) 
     { 
         if (A[i] < A[i-1]) 
         { 
             j = i-1; 
             temp = A[i]; 
             while (j >= 0 && temp < A[j]) 
             { 
                 A[j+1] = A[j]; 
                 j--; 
             } 
             A[j+1] = temp; 
         } 
     } 
} 
```



 <font size=4em color='#9ed048'>冒泡排序:</font> 

 ```c++
void BubbleSort(int A[], int n) 
{ 
     int i, j, temp, flag = 1; 
     for (i=n-1; i >= 1 && flag == 1; i--) 
     { 
         flag = 0; 
         for (j=0; j < i; j++) 
         { 
             if (A[j] > A[j+1]) 
             { 
                 temp = A[j]; 
                 A[j] = A[j+1]; 
                 A[j+1] = temp; 
                 flag = 1; 
             } 
    	 } 
     } 
} 
 ```

 <font size=4em color='#9ed048'>选择排序:</font> 

```c++
void SelectSort(int A[], int n) 
{ 
     int i, j, min, temp; 
     for (i=0; i < n; i++) 
     { 
         min = i; 
         for (j=i+1; j < n; j++) 
         { 
             if (A[min] > A[j]) 
                 min = j; 
         } 
         if (min != i) 
         { 
             temp = A[min]; 
             A[min] = A[i]; 
             A[i] = temp; 
         } 
     } 
} 
```

 <font size=4em color='#9ed048'>堆排序算法:</font> 

```c++
void HeadAdjust(vector<int> A,int k,int len){
    //将以k为根节点的树进行调整
    A[0]=A[k];//暂存根节点
    for(int i=2*k;i<=len;i*=2){ //乘2是找孩子节点
        if(i<len&&A[i]<A[i+1]){
            i++;   //移到更大的孩子上
        }
        if(A[0]>=A[i]){
            break;
        }else{
            A[k]=A[i];
            k=i;
        }
    }
    A[k]=A[0];
}

void BuildMaxHeap(vector<int> A,int len){ //建立大根堆
    for(int i=len/2;i>0;i--){
        HeadAdjust(A,i,len);
    }
}

void HeapSort(int A,int len){
    BuildMaxHeap(A,len);
    for(int i=len;i>1;i--){
        Swap(A[i],A[1]);
        HeadAdjust(A,1,i-1);  //从小到大排序用大根堆，建完堆后每次取堆顶元素与最后一个元素交换，再调整交换后的前面的元素
    }
}




```





