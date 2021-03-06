<div style='text-align: center;'>
<h1> <font size=6em color='#ff7f50'>计算机网络</font>
</h1></div>





 <font size=4em color='#9ed048'>各种协议所在层数:</font>

​	应用层：DHCP，RIP，BGP，DNS，FTP，POP3，SMTP，HTTP，MIME

​	传输层：TCP，UDP

​	网络层：ARP，ICMP，IP，OSPF

​	链路层： PPP，HDLC，CSMA



无流量控制：PPP协议

有流量控制：停等协议、ARQ协议、滑动窗口协议



<font  size=3px color='#8d4bbb'>各种协议详细 :</font>

__应用层协议__

| 协议名称 | 详细                                                         |                    |
| -------- | :----------------------------------------------------------- | ------------------ |
| BGP      | 基于__TCP__的，采用路径向量路由选择协议，路由表包括: 网络前缀、下一跳路由 | 边界网关协议       |
| RIP      | 基于__UDP__的，有 ”坏消息传的慢“ 最大距离为15 (16表示不可达)，王道书P78 | 路由信息协议       |
| DHCP     | 用来分配 IP 的                                               | 动态主机配置协议   |
| POP3     | 与SMTP是一对的，用来收邮件的                                 | 邮局协议           |
| SMTP     | 与POP3是一对的，用来发邮件的                                 | 简单邮件传输协议   |
| MIME     | 也是与邮件相关的，定义了邮件内容的格式，定义了传输编码，可对任何内容格式进行转换 | 多用途网际邮件扩充 |
| FTP      | 注意其控制连接和数据连接，还有两种传输模式POST和PASV 主动和被动[^] | 文件传输协议       |
| DNS      | 域名系统 有递归查询和迭代查询                                | 域名系统           |
| HTTP     | 注意持久连接和非持久连接                                     | WWW访问协议        |

__传输层协议__

​	 <font size=4em color='#9ed048'>TCP :</font> 

可靠、面向字节流(将数据视为一连串的无结构的字节流)、端对端的(进程—进程)[^不是点对点]

​	 <font size=4em color='#9ed048'>UDP:</font>



__网络层协议__

| 协议名称 | 详细                                                         |                  |
| -------- | :----------------------------------------------------------- | ---------------- |
| ARP      | 完成 IP --> MAC 的映射  ARP请求分组是广播，响应分组是单播    | 地址解析协议     |
| IP       | IP内容多                                                     | IP协议           |
| OSPF     | 基于IP的，数据报首部的协议字段89                             | 开放最短路径优先 |
| ICMP     | __①终点不可达__(路由器/主机不能交付数据时) __②源点抑制__(当路由器或主机太拥塞而丢弃数据包时)__③时间超时__ __④参数问题__ __⑤改变路由__(重定向) | 网际控制报文协议 |
|          |                                                              |                  |

​	 <font size=4em color='#9ed048'>IP 协议:</font>

点对点的(主机—主机)









__链路层协议__

| 协议名称 | 详细                                                       |                      |
| -------- | :--------------------------------------------------------- | -------------------- |
| PPP      | 使用串行线路通信的__面向字节__的协议，SLIP基础上发展过来的 | 点对点协议           |
| HDLC     | ISO制定的面向比特的                                        | 高级数据链路控制协议 |
| CSMA     | 基于IP的，数据报首部的协议字段89                           | 动态主机配置协议     |

PPP  [^王道书P116]:

​	①组成：链路控制协议(LCP)、网络控制协议(NCP)、最大传输单元(MTU)

HDLC [^王道书P117] ：

​	①3种数据操作方式 ：正常响应模式、异步平衡响应模式、异步响应模式




---



## 🌮__第一章 计算机体系结构__



<font  size=3px color='#8d4bbb'>小知识点 </font>

 <font size=4em color='#9ed048'>协议:</font>



> 由 语法、语义、时序(又称同步) 三部分组成

_语法_ :  规定了通信双方彼此"如何讲"，即规定了传输数据的格式。

_语义_ : 规定了通信双方彼此"讲什么"，即规定了所要完成的功能。

_时序_ : 规定了信息交流的次序。

 <font size=4em color='#9ed048'>体系结构 :</font> 计算机网络的各层及其协议的集合称为__体系结构__,分层就涉及对各层功能的划分，体系结构是抽象的，它不包括各层协议的具体实现细节。

 <font size=4em color='#9ed048'>拥塞控制 :</font> 网络层和传输层才具有拥塞控制功能。

|        | ISO/OSI参考模型  |    TCP/IP模型    |
| :----: | :--------------: | :--------------: |
| 传输层 |     面向连接     | 无连接 +面向连接 |
| 网络层 | 无连接 +面向连接 |      无连接      |

 <font size=4em color='#9ed048'>OSI参考模型中传输数据名称 :</font>

在对等层之间传送的数据的单位都称为__协议数据单元__(PDU)；具体而言，在_传输层_ 称为__报文段(TCP)__ 或 __用户数据报(UDP)__ ，在_网络层_ 称为__分组__ 或 __数据报__ ,在数据链路层称为 __帧__ ，在物理层称为 __比特__ 。 

 <font size=4em color='#9ed048'>各种设备 :</font>

①集线器： 是一个多端口的中继器，工作在物理层 ( 傻瓜器 )。   

②以太网交换机：是一个多端口的网桥，工作在数据链路层。

③路由器：是网络层设备，它实现了网络模型的下三层，即物理层、数据链路层、和网络层。

 <font size=4em color='#9ed048'>各层服务访问点 (SAP) :</font>

>  是一个层次系统的上下层之间进行通信的接口，N层的SAP是N+1层可以访问N层服务的地方。

_物理层_ : __“网卡接口”__ 

_数据链路层_ : __“MAC地址(网卡地址)”__ 

_网络层_ : __“IP地址 (网络地址)”__ ,

_传输层_ : __“端口号”__

_应用层_ : __“用户界面 ”__



 <font size=4em color='#9ed048'>协议与服务的区别与联系 :</font>

> 协议是控制两个对等实体之间通信的规则的集合。在协议的控制下，两个对等实体间的通信使得本层能够向上一层提供服务，而要实现本层协议，还需要使用下一层提供的服务

__概念区分 :__

①协议的实现保证了能够向上一层提供服务。本层的服务用户只能看见服务而无法看见下面的协议，即下面的协议对上面的服务用户是透明的

②协议是“水平”的，即协议是控制两个对等实体之间的通信的规则。但服务是“垂直的”，即服务是由下层通过层间接口向上层提供的。





## 🥗__第二章 物理层__

<font  size=3px color='#8d4bbb'>小知识点 </font>

  <font size=4em color='#9ed048'>QAM ( 正交振幅调制 ):</font> 是一种用模拟信号传输数字数据的编码方式。曼彻斯特编码和差分曼彻斯特编码都是用数字信号传输数字数据的编码方式。

  <font size=4em color='#9ed048'>最大数据传输速率:</font> __注意__ ：若给出了码元与比特数之间的关系，则需受两个公式的共同限制，奈奎斯特准则条件是①理想低通②无噪声 (P41 15题)

  <font size=4em color='#9ed048'>虚电路:</font> 有临时性连接，也有永久性的

  <font size=4em color='#9ed048'>信道传输速率:</font> 实际上就是信号的发送速率，而调制速率会直接限制数据传输速率，调制速率就是码元的传输速率

  <font size=4em color='#9ed048'>同轴电缆:</font> 利用一根同轴电缆互连主机构成以太网，则主机间的通信方式为 _半双工_ ,同轴电缆比双绞线的传输速率更快得益于同轴电缆有更高的屏蔽性，同时有更好的抗噪声性 P54-4

  <font size=4em color='#9ed048'>转发器:</font>  作用是放大信号，是物理层设备，无寻址功能

  <font size=4em color='#9ed048'>两个定理:</font> 

​		香农定理 ：2WlogV                         [^log2]

​		奈奎斯特定理：Wlog(1+S/N)          [^log2]

​		W：若给的是频率范围，则W是这个范围的值 例：频率范围是3.5~3.9MHz 则 M=3.9-3.5=0.4MHz[^模拟卷一 T34]

​		dB=10log(S/N) [^log10]       30dB-->S/N = 1000  

​		__注意__ ：若给出了码元与比特数之间的关系，则需受两个公式的共同限制，奈奎斯特准则条件是①理想低通②无噪声 [^王道书P41-15] [^模拟卷三 T34]



## 🍤__第三章 数据链路层__

  <font size=4em color='#9ed048'>信道利用率:</font> 有效地发送数据的时间占整个发送周期的比率   (L/C)/T  ,L为这个周期内共发送L比特的数据，C为放送方的数据传输速率，T为一个发送周期。发送周期T=RTT+

  <font size=4em color='#ff7f50'>需要掌握:</font> 海明不等式、海明距、

  <font size=4em color='#ff7f50'>滑动窗口:</font> 发送窗口+接收窗口<= 帧序号 P78 

  <font size=4em color='#ff7f50'>码片序列考点:</font>  两个码片序列要同时向一个链路上传的话，则要规格化内积为0，要反求数据的话，就相乘就行 例:P 97-24

  <font size=4em color='#ff7f50'>CSMA/CD 协议:</font>

​	碰撞后的指数退避算法:

> k = Min{重传次数,10}  从[ 0, 1, 2 ... , 2^k -1] 中选 r , 重传推迟延迟时间2rㄛ ，2ㄛ 是争用期
>
> 最小帧长 = 2*总线传播时延 * 数据传输速率 = RTT * 数据传输速率










## 🥩__第四章 网络层__















## 🍪__第五章 传输层__



## 🍨__第六章 应用层__



[^模拟卷]: 
[^log2]: log以为2底
[^log10]: 以10为底

