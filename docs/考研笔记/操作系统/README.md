<div style='text-align: center;'>
<h1> <font size=6em color='#ff7f50'>操作系统</font>
</h1></div>



---



## 🌮__第一章 操作系统概述__



<font  size=3px color='#8d4bbb'>小知识点 </font>

 <font size=4em color='#9ed048'>中断:</font> 区分内中断和外中断 

1.  内中断 ：

​				①自愿中断----指令中断

​				②强迫中断 ：硬件故障，软件中断

2. 外中断(强迫中断) : 

​				外设请求，人的干预

3. 用户态-->内核态 : 需要加以保护 (因为用户到内核需要用到中断请求)

4. 内核态-->用户态 : 不需要加以保护

5. 中断发生时，由硬件保护并更新程序计数器（PC），而不是由软件完成，主要是为了 __可靠安全__ 而不是为了提高处理速度

 <font size=4em color='#9ed048'>异常:</font> 

​	需要异常处理 ： 除数为0，地址越界，缺页故障

​	不需要异常处理：Cache 缺失(Cache是缓存，缓存缺失不影响指令执行)

 <font size=4em color='#9ed048'>核心态:</font> 执行 I/O 指令、系统调用、修改页表等

 <font size=4em color='#9ed048'>用户态:</font> 通用寄存器清零

 <font size=4em color='#9ed048'>优先级问题:</font> [^模拟卷七 T25]

1. I/O型作业的优先级高于计算型作业
2. 系统进程的优先级高于用户进程
3. 资源要求低的优先级高于资源要求高的
4. 作业的优先级与长作业、短作业或者是系统资源要求的多少没有必然的关系

 <font size=4em color='#9ed048'>系统抖动:</font>

1. 对换的信息量过大、内存容量不足不是引起系统抖动现象的原因，而选择的置换算法不当才是引起抖动的根本原因。

2. 只有虚拟页式和虚拟段式才存在换入换出的操作，简单页式和简单段式因已经全部将程序调入内存，因此不需要置换，也就没有抖动现象。注意区分

   简单式和虚拟式的区别。

 <font size=4em color='#9ed048'>中断向量:</font> 是中断服务程序在主存中的入口地址 

 <font size=4em color='#9ed048'>处理机调度:</font> 

1. 在进程结束时能进行处理机调度
2. 创建新进程后能进行处理机调度

3. 在系统调用完成并返回用户态时能进行处理机调度
4. 在进程处于临界区时能进行处理机调度，因为若不能进行处理机调度，则系统的性能会非常差 [^王道书P69]



 <font size=4em color='#9ed048'>进程调度算法:</font> 

1. __多级反馈队列调度算法：__

   需要考虑的是 

   ①就绪队列的数量（会影响长进程的最终完成时间）

   ②就绪队列的优先级（会影响进程执行的顺序）

   ③各就绪队列的调度算法（会影响各队列中进程的调度顺序）

   ④进程在就绪队列中的迁移条件 （会影响各进程在各队列中的执行时间）



<font size=4em color='#9ed048'>通道的工作原理:</font> 

![通道的工作原理](C:\Users\asus\Desktop\考研\Image\通道的工作原理.png)



<font  size=3px color='#8d4bbb'>关于并发和并行 </font>

①程序和程序之间是并发的

②通道和程序（即CPU）之间并没有完全并行： CPU通过执行I/O指令负责启停通道，以及处理来自通道的中断实现对通道的管理

③设备与通道并行：设备工作时，只和通道交互，此时与程序与其并行工作



## 🥗__第二章 进程管理__

<font  size=3px color='#8d4bbb'>小知识点 </font>

 <font size=4em color='#9ed048'>处理器:</font>

处理器效率：CPU进入等待态的时候效率就会降低

 <font size=4em color='#9ed048'>进程:</font>

​	①一个进程可以包含多个线程，各线程共享进程的虚拟地址空间，但各线程不共享栈

​	②引入线程后，进程只作为除CPU外的系统资源的分配

|          |                           进程创建                           |                           进程终止                           |
| -------- | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 引发事件 | 1.终端用户登录系统<br />2. 作业调度<br />3. 系统提供服务<br />4. 用户程序的应用请求 | 1.正常结束<br />2. 异常结束，由于发生异常(如存储区越界)而终止进程<br />3. 外界干预，进程应外界请求而终止运行 |
| 过程     | 1.申请空白PCB<br />2. 为新进程分配资源<br />3. 初始化PCB<br />4. 如果进程就绪队列能接纳新进程，就将新进程插入到就绪队列 |                         核心考点 P77                         |

注意：设备分配不会导致创建新进程，因为只是设置相应的数据结构

 <font size=4em color='#9ed048'>线程:</font>  

①系统动态DLL库中的系统线程，被不同的进程所调用，它们是相同的线程，程序代码经过多次创建可对应不同的进程，而同一个系统的进程（或者线程）可以由系统调用的方法被不同的进程或线程多次使用。	

 <font size=4em color='#9ed048'>进程通信:</font>

1. PV操作 （低级通信方式）
2. 共享存储 （高级通信方式）
3. 消息传递 （高级通信方式）
4. 管道通信 （高级通信方式）：管道是半双工通信

 <font size=4em color='#9ed048'>死锁:</font>  

由于多个进程因竞争资源而造成的一种 僵局，若无外力推动，则这些进程都无法向前推进。[^模拟卷四 T27]（注意和资源造成的饥饿进行区分）

__解决死锁问题__:

死锁预防：顺序资源分配法 ( 破坏循环等待条件 ，会造成资源的浪费)

死锁避免：银行家算法

死锁的检测与解除：资源分配图化简法

 <font size=4em color='#9ed048'>管程:</font>  	

组成：

①管程的名称 ②局部于管程内部的共享结构数据说明 ③对于数据结构进行操作的一组过程（或函数）

④对局部于管程内部的共享数据设置初始值的语句



1. 各个进程只能串行的执行管程内的过程，这一特性保证了进程 ‘互斥’ 访问共享数据结构 S

## 🍤__第三章 内存管理__

  <font size=4em color='#9ed048'>内存管理图示:</font> 

![内存管理图示](C:\Users\asus\Desktop\考研\Image\内存管理图示.png)

  <font size=4em color='#ff7f50'>需要掌握:</font> 



 <font size=4em color='#9ed048'>虚拟页式存储管理:</font>  

三个主要特征：多次性、对换性、虚拟性

容量：却决于地址空间的大小，而不是实际的内存容量



 <font size=4em color='#9ed048'>虚拟存储管理:</font>  

虚拟存储管理系统的基础是程序的局部性(有两种类型)：

时间和空间局部性



## 🥩__第四章 文件管理__

 <font size=4em color='#9ed048'>文件系统:</font>  

1. 文件系统使用文件名进行管理，也实现了文件名到物理地址的转换。
2. 对文件的访问只需通过路径名
3. 逻辑记录是文件中按信息在逻辑上的独立含义来划分的信息单元，它是对文件进行存取操作的基本单位。
4. 




## 🥩__第五章 IO管理__



![IO层次结构](C:/Users/asus/Desktop/考研/Image/IO层次结构.png)





![设备控制器的组成](C:/Users/asus/Desktop/考研/Image/设备控制器的组成.png)



<img src="C:/Users/asus/Desktop/考研/Image/DMA.png" alt="DMA" style="zoom:80%;" />





 <font size=4em color='#9ed048'>处理数据:</font> 

磁盘传到缓冲区: T           缓冲区传到用户区：M     CPU处理数据：C

单缓冲：Max（T，C）+ M

双缓冲：Max（C+M，T）

若要算系统所用总时间 要画图来算[^模拟卷四 T32 ]

 <font size=4em color='#9ed048'>通道管理:</font> 

​	__通道__ :通道是一种硬件、或特殊的处理器，有自身的指令，但没有自己的内存，通道指令存放在主机的内存中，也就是说通道与

CPU共享内存。

   __需要用到的数据结构__：系统设备表，设备控制表，控制器控制表，通道控制表



 <font size=4em color='#9ed048'>SPOOLing技术:</font> 

> 将独占设备虚拟成共享设备，使得多个进程共享一个独占设备

组成：预输入程序、井管理程序、缓输出程序

目的：提高独占设备的利用率







  <font size=4em color='#ff7f50'>小知识点:</font>

1. 可寻址是块设备的基本特征，字符设备没有。

2. 共享设备是指一段时间内允许多个进程同时访问的设备。

3. 分配共享设备是不会引起进程死锁的

4. 磁盘是典型的块设备，DMA主要作用于块设备,

5. 通道技术是指一种硬件技术，是一种特殊的处理器，__注意不是软件__ , SPOOLing、缓冲池、内存覆盖都是在内存的基础上通过软件实现的

6. DMA中有：

   ①命令/状态寄存器，②数据寄存器 ③内存寄存器

   没有 堆栈指针寄存器

7. 字节多路通道可以用作连接大量的低速或中速的 I/O设备

8. 及时性 不是 设备分配时应该考虑的问题

9. 通道-->设备控制器-->设备   ，三者的控制关系__层层递进__

10. 来自通道的 I/O中断事件由设备管理负责处理

11. 用中断I/O工作的外设（例如键盘），当用户输入信息时，计算机响应中断并通过中断处理程序获得输入信息

12. 将系统调用参数翻译成设备操作命令的工作由 __设备无关的操作系统软件__ 完成

13. 用户程序发出磁盘 I/O 请求后，系统的正确处理流程是：

用户程序 ------> 系统调用处理程序--------->设备驱动程序----------> 中断处理程序

14. 分配设备时主要考虑的因素有：I/O设备的固有属性、IO设备的分配算法、IO设备分配的安全性以及IO设备的独立性

15. 提高单机资源利用率的关键技术是：__多道程序设计技术__

      

