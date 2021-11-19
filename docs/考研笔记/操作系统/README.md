<div style='text-align: center;'>
<h1> <font size=6em color='#ff7f50'>操作系统</font>
</h1></div>



---



## 🌮__第一章 操作系统概述__



<font  size=3px color='#8d4bbb'>小知识点 </font>

 <font size=4em color='#9ed048'>中断:</font> 区分内中断和外中断 

 内中断 ：

​				①自愿中断----指令中断

​				②强迫中断 ：硬件故障，软件中断

 外中断(强迫中断) : 

​				外设请求，人的干预

用户态-->内核态 : 需要加以保护 (因为用户到内核需要用到中断请求)

内核态-->用户态 : 不需要加以保护



 <font size=4em color='#9ed048'>异常:</font> 

​	需要异常处理 ： 除数为0，地址越界，缺页故障

​	不需要异常处理：Cache 缺失(Cache是缓存，缓存缺失不影响指令执行)



 <font size=4em color='#9ed048'>核心态:</font> 执行 I/O 指令、系统调用、修改页表等

 <font size=4em color='#9ed048'>用户态:</font> 通用寄存器清零

 <font size=4em color='#9ed048'>中断向量:</font> 是中断服务程序在主存中的入口地址 

<font size=4em color='#9ed048'>通道的工作原理:</font> 

![通道的工作原理](Image\通道的工作原理.png)

<font  size=3px color='#8d4bbb'>关于并发和并行 </font>

①程序和程序之间是并发的

②通道和程序（即CPU）之间并没有完全并行： CPU通过执行I/O指令负责启停通道，以及处理来自通道的中断实现对通道的管理

③设备与通道并行：设备工作时，只和通道交互，此时与程序与其并行工作



## 🥗__第二章 进程管理__

<font  size=3px color='#8d4bbb'>小知识点 </font>

 <font size=4em color='#9ed048'>进程:</font>

​	①一个进程可以包含多个线程，各线程共享进程的虚拟地址空间，但各线程不共享栈



 <font size=4em color='#9ed048'>线程:</font>  

​	

 <font size=4em color='#9ed048'>死锁:</font>  

由于多个进程因竞争资源而造成的一种 僵局，若无外力推动，则这些进程都无法向前推进。[^模拟卷四 T27]（注意和资源造成的饥饿进行区分）

## 🍤__第三章 内存管理__

  <font size=4em color='#9ed048'>内存管理图示:</font> 

![内存管理图示](Image\内存管理图示.png)

  <font size=4em color='#ff7f50'>需要掌握:</font> 



 <font size=4em color='#9ed048'>虚拟页式存储管理:</font>  

三个主要特征：多次性、对换性、虚拟性

容量：却决于地址空间的大小，而不是实际的内存容量









## 🥩__第四章 文件管理__






## 🥩__第五章 IO管理__



 <font size=4em color='#9ed048'>处理数据:</font> 

磁盘传到缓冲区: T           缓冲区传到用户区：M     CPU处理数据：C

单缓冲：Max（T，C）+ M

双缓冲：Max（C+M，T）

若要算系统所用总时间 要画图来算[^模拟卷四 T32 ]

 <font size=4em color='#9ed048'>通道管理:</font> 

​	__通道__ :通道是一种硬件、或特殊的处理器，有自身的指令，但没有自己的内存，通道指令存放在主机的内存中，也就是说通道与

CPU共享内存。

   __需要用到的数据结构__：系统设备表，设备控制表，控制器控制表，通道控制表

