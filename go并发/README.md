### Go 并发

#### 进程、线程、协程

在Go语言中，理解和讨论并发模型时，提及的“进程”、“线程”和“协程”分别代表了不同级别的并行和并发处理单元。下面是对这三个概念的简要解释，特别是在Go语言的上下文中：

1. **进程（Process）**: 进程是操作系统进行资源分配和调度的基本单位，它拥有独立的内存空间和系统资源。当一个程序被执行时，操作系统会创建一个或多个进程。在Go中，当你启动一个Go程序时，至少会有一个主进程。Go程序的并发特性主要不是通过多进程实现的，不同进程之间的数据不能直接共享, 通常通过进程间通信（IPC）来进⾏数据交换，例如管道、消息队列等。
2. **线程（Thread）**: 线程是进程内的执行流，是CPU调度的基本单位。一个进程可以包含一个或多个线程，它们共享进程的地址空间和资源，但每个线程有自己的栈、程序计数器等状态。在传统的并发编程中，多线程是提高程序执行效率的一种常用手段。Go语言的运行时环境（runtime）底层确实使用了线程，但它隐藏了这些细节，让开发者可以更专注于更高层次的并发控制。
4. **协程（Goroutine）**: 协程，或称作Go程（Goroutine），是Go语言提供的轻量级的用户态线程，是Go并发模型的核心。Goroutine由Go运行时管理，它们比操作系统线程更轻量，创建和切换的成本很低。在一个Go程序中，可以轻松创建成千上万个Goroutine。Goroutines在同一个地址空间内运行，共享内存，通过通道（Channels）进行通信和同步。Go运行时会根据系统的实际情况自动调度Goroutines到可用的OS线程上执行，有效地管理资源和提升并发性能。

#### 线程、进程的区别

1. **资源分配与管理**

   - **进程**是系统进行资源分配和调度的基本单位。每个进程都有独立的地址空间，即拥有自己的内存空间（包括代码段、数据段、堆、栈等），并且拥有独立的系统资源，如文件描述符、信号处理器等。操作系统负责进程的创建、调度、通信和销毁。

   - **线程**是进程内的执行单元，共享所属进程的地址空间和资源。线程不直接拥有系统资源，它只保留一组必需的运行时状态，如程序计数器、栈和局部变量等。线程的创建、调度和销毁由其所属进程或运行时库管理，而且线程间的上下文切换通常比进程更快、成本更低。

2. **切换**：线程上下⽂切换⽐进程上下⽂切换要快得多。

3. **系统开销:** 创建或撤销进程时，系统都要为之分配或回收系统资源，如内存空间，I/O 设备等，OS 所付出的开销显著⼤于在创建或撤销线程时的开销，进程切换的开销也远⼤于线程切换的开销

4. **独立性**：

   - 进程是独立的执行环境，一个进程崩溃不会直接影响到其他进程（除非它们共享某些资源且未正确管理）。

   - 线程则相对不那么独立，一个线程的异常通常会导致整个进程终止，因为它们共享相同的地址空间。

5. **并发与并行**：

   - 进程和线程都能实现并发执行，即在宏观上看起来是同时进行的。在支持多处理器或多核心的系统中，线程还可以实现并行，即真正的同时执行。

6. **通信**：

   - 同一进程内的线程间可以直接访问共享内存，通信简单、高效，但需要同步机制（如互斥锁、信号量等）来避免数据竞争。
   - 不同进程间的通信则需要借助于进程间通信（IPC）机制，如管道、套接字、信号、共享内存、消息队列等，相比线程间通信更为复杂和耗时。

#### 协程 和 线程 的区别

协程（`Coroutine`）和线程（`Thread`）都是实现程序并发执行的机制，但它们在多个方面存在本质区别：

- 线程和进程都是同步机制，而协程是异步机制
- 线程是抢占式的，而协程是非抢占式的。需要用户释放使用权切换到其他协程，因此同一时间其实只有一个协程拥有运行权，相对于单线程的能力。

1. **控制权与调度**：
   - **线程**：线程由操作系统内核管理，其创建、调度和切换等操作都需要操作系统介入，因此线程的上下文切换开销大，涉及模式切换（从用户态到内核态，反之亦然）。
   - **协程**：协程又称微线程，是在用户态下由程序自身控制调度的轻量级实体，无需操作系统参与。协程的切换仅需保存和恢复执行上下文（主要是寄存器状态和栈信息），因此开销小，切换速度快。

2. **资源消耗**：

   - **线程**：每个线程都有独立的栈空间和程序计数器等资源，占用内存较多，创建和维护成本较高。

   - **协程**：协程共享所在线程的栈空间（或有独立较小的栈），资源消耗少，可以创建大量协程而不过度消耗系统资源。

3. **并发与并行**：

   - **线程**：在多核处理器上，多个线程可以真正并行执行，充分利用硬件资源。

   - **协程**：协程本身不能直接实现并行执行，它们共享所在的线程资源，同一时刻一个线程中只有一个协程在运行，因此协程实现的是并发而不是并行。但通过在多个线程上部署协程，依然可以间接实现并行。

4. **执行模型**：

   - **线程**：线程是抢占式的，操作系统可以随时中断一个线程，转而执行另一个线程，无需当前线程主动放弃控制权。

   - **协程**：协程通常是协作式的，即非抢占式，需要协程自己决定何时挂起（yield）以允许其他协程运行。但某些语言或库也支持协程的抢占式调度。

5. **同步与锁**：

   - **线程**：多线程编程中，为了防止数据竞争和同步问题，常常需要使用锁、信号量等同步原语，增加了编程复杂度。
   - **协程**：由于协程在同一地址空间内运行，且通常在单一线程上调度，减少了数据竞争的风险，很多时候可以避免使用锁，简化同步逻辑。

> 综上所述，协程在处理大量IO密集型任务、需要高并发且对响应时间敏感的应用中更为高效，而线程则更适合CPU密集型任务和能充分利用多核处理器的场景。

#### 并行 和 并发 的区别

并行（Parallelism）和并发（Concurrency）是计算机科学中描述程序执行方式的两个重要概念，它们有着本质的区别：

1. **并行（Parallelism）**：
   - **定义**：并行是指在多处理器或多核系统中，能够同时执行多个任务的能力。这意味着在物理上，不同的任务（或其部分）可以同时在不同的处理器或核心上执行，它们之间没有直接的时间上的交错，是真正意义上的“同时进行”。
   - **特点**：并行强调的是同时性，需要硬件支持，比如多核CPU或者分布式系统，才能实现任务的同时执行。
   - **应用场景**：适用于计算密集型任务，如大数据处理、科学计算、大规模图像渲染等，可以显著提升处理速度。
2. **并发（Concurrency）**：
   - **定义**：并发是指在一段时间内，系统能够处理多个任务，这些任务看似同时进行，但实际上可能是交替执行的。在单处理器系统中，通过任务的快速切换，给用户造成“同时进行”的错觉。
   - **特点**：并发关注的是任务的组织和调度，使得程序能够在宏观上同时处理多个请求或执行多个操作，而微观上可能仍然是顺序执行的。它不一定需要多核处理器，单核处理器通过时间片轮转等机制也能实现并发。
   - **应用场景**：适合于I/O密集型任务，如Web服务器处理多个请求、数据库操作、用户界面交互等，可以提高系统的响应速度和吞吐量。

>  **总结**：并发强调的是任务的开始和结束时间重叠，不强调是否真正同时执行；而并行则强调任务在物理上的同时执行。在实际应用中，两者经常结合使用，例如，在一个多核系统中，可以使用并发来组织和调度大量的任务，而并行则利用多核的计算能力来同时执行这些任务，以达到更高的效率和性能。

#### Go 语言的并发模型

Go语言的并发模型主要基于两个核心概念：Goroutines 和 Channels。下面是Go并发模型的关键组成部分及其工作原理：

1. **Goroutines**: Goroutines 是Go语言提供的轻量级线程，它们允许同时执行多个函数或方法。与传统的操作系统线程相比，goroutines 更轻量，创建和上下文切换的开销极小，使得在单个应用程序中可以轻松创建成千上万的goroutines。每个goroutine都拥有自己的栈空间、指令指针和局部变量，但与其他goroutines共享同一地址空间。Go运行时负责goroutine的调度，决定何时以及在哪一个OS线程上执行goroutine。
2. **Channels**: Channels 是Go语言用于goroutines之间通信和同步的原语。它们是一种类型化的数据传输通道，允许安全地在goroutines间发送和接收数据。通过channel进行通信可以确保数据的同步访问，从而避免了传统并发模型中常见的竞态条件和死锁问题。Channels可以是缓冲的也可以是非缓冲的，前者可以暂存一定数量的数据，后者则要求发送和接收操作必须立即匹配。
3. **Share Memory by Communicating**: Go语言推荐的并发编程哲学是“通过通信来共享内存”，而不是“通过共享内存来通信”。这意味着程序应该设计成通过channels传递数据，而不是直接访问共享内存。这样可以减少锁的使用，简化并发编程，提高程序的可读性和可靠性。
4. **Select Statement**: Go还提供了select语句，它类似于其他语言中的switch语句，但用于在多个channel操作上等待，可以实现非阻塞的channel操作和超时处理，增强了并发控制的灵活性。（多路复用）
5. **Synchronization Primitives**: 虽然Go鼓励使用channel进行同步，但在某些情况下，仍然需要传统的同步原语，如Mutex（互斥锁）、WaitGroup、Cond（条件变量）等来保护共享资源和同步goroutines。

#### Go 语言中的 Select

在Go语言中，`select`语句是一种用于实现goroutines之间的通信和同步的控制结构，它类似于其他语言中的`switch`语句，但专门用于处理channel的操作。`select`语句可以用来等待多个channel操作，并根据channel的就绪状态动态决定执行哪一部分代码。它非常适合用于处理并发任务的调度、超时判断或是从多个channel中选择数据等场景。

1. **非阻塞选择**：当有多个`case`分支时，`select`会随机（实际上依据内部策略）选择一个准备好的`case`执行。如果所有`case`都没有准备好（即没有可接收的数据或没有可用的发送缓冲区），则执行`default`分支（如果存在）。如果没有`default`，则`select`会阻塞，直到至少有一个`case`准备好。
2. **超时处理**：通过与`time.After`函数配合，可以方便地为某个操作添加超时机制。
3. **优雅的取消与关闭**：`select`常用于监听一个或多个channel，以便优雅地处理goroutine的取消或关闭操作，比如通过`context.Done()` channel来响应取消信号。
4. **并发控制**：在需要根据不同channel的事件作出响应的场景下，`select`提供了一种灵活且高效的方式来进行控制流的管理。

示例：

从两个channel中选择数据

```go
select {
case msg := <-chan1:
    fmt.Println("Received from chan1:", msg)
case msg := <-chan2:
    fmt.Println("Received from chan2:", msg)
}
```

带超时的选择

```go
timeout := time.After(2 * time.Second)
select {
case res := <-resultChan:
    fmt.Println("Result received:", res)
case <-timeout:
    fmt.Println("Request timed out")
}
```

总之，`select`语句是Go语言处理并发和异步通信的强大工具，它提供了一种简洁、灵活的方式来协调goroutines之间的交互，特别是在需要处理多个并发事件或信号的场景下。

#### 什么是Go Routine

Go Routine（通常简称为Goroutine）是Go语言中的一种轻量级线程实现，是其并发模型的核心组件。Goroutines 允许程序在同一地址空间内并行（或者看起来像是并行）执行多个函数或方法，而无需直接使用操作系统级别的线程或进程。Go运行时（runtime）负责管理这些goroutines，包括它们的创建、调度和销毁，使得开发者能够以低成本地利用多核处理器和提高程序的并发性能。

**Goroutines 的几个关键特点包括：**

- **轻量级**：相比于操作系统线程，goroutine 的创建和上下文切换开销很小，可以轻松创建成千上万个goroutine。
- **用户级调度**：goroutine 的调度由Go运行时在用户空间完成，而不是依赖操作系统内核，这使得调度更加高效。
- **共享内存**：虽然每个goroutine有自己独立的栈空间，但它们共享同一个地址空间，意味着可以访问相同的全局变量和动态分配的内存，但也因此需要小心处理数据竞争。
- **通信与同步**：Go推荐使用通道（Channels）作为goroutines之间通信的主要手段，遵循“不要通过共享内存来通信，而应通过通信来共享内存”的原则，以此减少锁的使用，提高并发安全。
- **并发而非并行**：虽然goroutines可以在多核系统上并行执行，但goroutine本身并不直接代表并行，它是并发执行的单位，具体是否并行执行依赖于Go运行时的调度策略和系统资源。

> 启动一个新的goroutine非常简单，只需在函数调用前加上关键字`go`即可，如`go myFunction()`。这样的设计让并发编程在Go语言中变得直观且易于实现。

#### 如何控制 goroutine 的生命周期

在Go语言中，控制goroutine的生命周期通常涉及到优雅地启动、管理以及适时终止goroutines。以下是几种常用的技术和模式：

1. **使用Context**
   - **Context包**提供了上下文对象，可以携带截止时间、取消信号等信息。通过`context.WithCancel`, `context.WithTimeout`, 或 `context.WithDeadline` 创建上下文，然后将此上下文传递给goroutine。在goroutine中定期检查上下文状态，一旦收到取消信号，就应当尽快清理资源并退出。
   - **取消函数**：使用`context.WithCancel`等函数时，会返回一个`context.Context`和一个取消函数。调用这个取消函数可以通知所有依赖于这个上下文的goroutines停止工作。
2. **sync.WaitGroup**
   - 当需要等待一组goroutines全部完成后再继续执行时，可以使用`sync.WaitGroup`。在启动每个goroutine之前递增WaitGroup的计数器，在goroutine完成时递减。最后，使用`Wait()`函数阻塞直到计数器归零。
3. **Channel作为信号**
   - 通过channel传递信号来控制goroutine的生命周期。例如，可以创建一个channel用于发送开始或停止信号，goroutine监听这个channel并据此行动。
4. **select语句**
   - 使用`select`语句监听多个channel，可以用来根据channel的就绪状态来控制goroutine的行为，包括响应取消信号或执行超时逻辑。
5. **关闭channel**
   - 发送者可以通过关闭channel来通知接收者不再有数据发送。接收者可以通过检查channel是否关闭来决定是否结束。
6. **runtime.Goexit**
   - 虽不常见，但在某些特殊场景下，`runtime.Goexit`可以用来立即终止当前goroutine，但这种方式不推荐用于常规控制流程，因为它不会执行defer语句和清理工作。
7. **自定义同步原语**
   - 在更复杂的场景中，可能需要实现自定义的同步原语，如使用sync.Mutex、sync.Cond等来精细控制goroutine间的协作和同步。

通过上述方法，你可以有效地控制goroutine的创建、执行和终止，确保程序的正确执行和资源的合理管理。在实践中，通常会根据具体需求组合使用这些机制来达到最佳的控制效果。

下面是一些控制goroutine生命周期的具体例子，涵盖了之前提到的一些关键技巧：

**使用 Context 控制 goroutine 生命周期**

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func worker(ctx context.Context, id int, workCh chan int) {
	for {
		select {
		case <-ctx.Done(): // 监听上下文的Done通道，收到信号则退出
			fmt.Printf("Worker %d is stopping...\n", id)
			return
		case job := <-workCh:
			fmt.Printf("Worker %d started job %d\n", id, job)
			time.Sleep(time.Second) // 模拟工作耗时
			fmt.Printf("Worker %d finished job %d\n", id, job)
		}
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background()) // 创建可取消的上下文
	defer cancel() // 确保main退出时取消所有goroutine

	workCh := make(chan int, 10)
	for i := 0; i < 3; i++ {
		go worker(ctx, i, workCh)
	}

	for job := 1; job <= 5; job++ {
		workCh <- job
		time.Sleep(500 * time.Millisecond)
	}
	cancel() // 主动取消goroutine
	time.Sleep(time.Second) // 等待goroutine打印停止信息
	fmt.Println("All workers stopped.")
}
```

**使用 sync.WaitGroup 等待 goroutine 完成**

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func task(wg *sync.WaitGroup) {
	defer wg.Done() // 完成任务后减少WaitGroup计数
	fmt.Println("Task started")
	time.Sleep(time.Second)
	fmt.Println("Task completed")
}

func main() {
	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1) // 启动新任务前增加WaitGroup计数
		go task(&wg)
	}
	wg.Wait() // 阻塞直到所有goroutine完成
	fmt.Println("All tasks completed.")
}
```

`context.WithTimeout` 和 `context.WithDeadline` 是 `context` 包提供的两个函数，用于为操作设置超时或绝对截止时间。当超时或截止时间到达时，通过上下文的 `Done()` 通道发送信号，使得监听该通道的goroutine可以得知并做出相应处理，通常是结束执行。下面是使用这两个函数控制goroutine生命周期的示例：

**使用 context.WithTimeout**

 ```go
 package main
 
 import (
 	"context"
 	"fmt"
 	"time"
 )
 
 func longRunningTask(ctx context.Context) {
 	for {
 		select {
 		case <-ctx.Done():
 			fmt.Println("Task canceled due to timeout.")
 			return
 		default:
 			fmt.Println("Working...")
 			time.Sleep(500 * time.Millisecond)
 		}
 	}
 }
 
 func main() {
 	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second) // 设置2秒超时
 	defer cancel() // 防止goroutine泄漏，即使没有超时也会在main结束时调用
 
 	go longRunningTask(ctx)
 
 	// 让main函数等待，否则程序会立即结束
 	time.Sleep(3 * time.Second)
 }
 ```

**使用 context.WithDeadline**

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func deadlineTask(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("Task canceled at deadline.")
			return
		default:
			fmt.Println("Working...")
			time.Sleep(500 * time.Millisecond)
		}
	}
}

func main() {
	deadline := time.Now().Add(2 * time.Second) // 设置2秒后的截止时间
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()
	go deadlineTask(ctx)
	time.Sleep(3 * time.Second) // 让main函数等待
}
```

Go 标准库中的  context 可以实现超时控制、取消、传递参数等功能。

#### Go 语言中的 Channel 是什么，有哪些用途，如何处理阻塞

Go语言中的 Channel 是一种用于在并发的Goroutines之间进行安全通信的机制。它允许数据在一个Goroutine中安全地发送到另一个Goroutine，而无需担心数据竞争或同步问题。Channel 的引入是为了促进基于消息传递的并发模型，而非传统的共享内存模型，从而降低并发编程的复杂度和潜在错误。

**Channel 的用途：**

1. **数据传递**：最直接的用途是在Goroutines间传递数据。它可以用来发送任何类型的数据，只要在声明时指定了正确的类型。
2. **同步**：除了传递数据外，Channel还可以用来同步Goroutines的执行。例如，当一个任务完成后，通过发送一个信号到Channel，告知其他Goroutines可以继续执行或改变状态。
3. **资源共享**：通过限制Channel的大小，可以实现对资源的控制访问，例如限制同时处理的任务数量，从而避免资源过度消耗。
4. **错误处理**：Channel可以用来传递错误信息，使得错误处理和正常的逻辑处理可以解耦。
5. **信号通知**：在需要通知其他Goroutines特定事件发生时，可以发送一个信号（通常是某种类型的空结构体）到Channel。

**如何处理阻塞:**

Channel操作（发送或接收）可能会引起阻塞，这取决于Channel的特性（缓冲与否）和当前的操作状况。以下是如何处理这些阻塞情况的一些建议：

1. **使用带缓冲的Channel**：无缓冲的Channel在没有接收方准备接收时发送数据会阻塞发送方，同样，如果没有数据可接收时尝试接收也会阻塞接收方。而带缓冲的Channel可以在缓冲区未满时继续发送数据，减少了阻塞的可能性。
2. **使用select语句**：通过`select`语句可以监听多个Channel，根据第一个准备好的Channel执行对应的操作，或者使用`default`子句来处理所有Channel都不就绪的情况，避免阻塞。
3. **使用定时器（time.Timer 或 time.After）**：结合Channel和定时器，可以在等待一段时间后执行默认操作，防止无限期阻塞。例如，可以为某个操作设定超时。
4. **关闭Channel**：当所有数据都发送完毕后，发送方应该关闭Channel。这不仅是一种信号，表明没有更多数据，而且尝试从一个已关闭的Channel接收数据也不会阻塞，只会返回元素类型的零值和`false`作为第二个返回值。
5. **合理设计并发模型**：在设计阶段考虑清楚哪些Channel需要是阻塞的，哪些需要非阻塞，以及何时使用同步或异步模式，可以有效减少不必要的阻塞情况。

通过上述方法，开发者可以有效地控制Channel的使用，避免或管理阻塞情况，以构建健壮、高效的并发程序。

#### 什么是互斥锁（mutex）？在什么情况下会用到他们？

互斥锁（Mutex），全称为互斥型信号量（Mutual Exclusion Semaphore），是一种同步原语，广泛应用于多线程或多进程编程中，用以解决对共享资源的并发访问冲突问题。互斥锁的核心功能是确保同一时间内只有一个线程可以访问被保护的资源区域，从而防止数据竞争和保持数据的一致性。

**互斥锁的使用场景包括但不限于以下几种情况：**

1. **资源独占访问**：当多个线程需要访问同一份共享资源（如全局变量、文件、数据库连接等）时，为了防止数据损坏或不一致性，可以使用互斥锁来确保每次只有一个线程能够进行访问。
2. **临界区保护**：在程序中，涉及共享资源修改的部分被称为“临界区”。为了保护临界区，可以在进入和退出临界区前后分别加锁和解锁，确保同一时刻只有一个线程在执行这部分代码。
3. **避免竞态条件**：竞态条件是指多个线程访问和修改同一数据时，由于执行顺序不同可能导致结果不同的情况。互斥锁通过序列化访问来消除这类问题。
4. **同步线程执行**：在某些情况下，可能需要一个线程等待另一个线程完成特定任务后才能继续执行。通过互斥锁配合条件变量或其他同步工具，可以实现线程间的协调。

**使用互斥锁的基本步骤：**

- **初始化**：在使用互斥锁之前，首先需要对其进行初始化。
- **加锁**：在访问共享资源之前，线程尝试获取锁。如果锁已经被其他线程持有，则该线程将被阻塞或挂起，直到锁变为可用状态。
- **解锁**：完成对共享资源的操作后，线程释放锁，允许其他等待的线程获得锁并执行。
- **销毁锁**（可选）：在不再需要互斥锁时，进行销毁操作（如果适用）。

**注意事项：**

- **死锁**：不当的锁使用可能导致死锁，即两个或多个线程互相等待对方释放锁而永久阻塞。
- **优先级反转**：高优先级线程可能因为等待低优先级线程持有的锁而延迟执行，影响系统性能。
- **性能考量**：频繁的加锁解锁操作会影响性能，因此应尽量减少锁的范围和持续时间。

**例子：**

> 假设我们有一个简单的银行账户类，其中包含一个余额字段，并提供存款和取款的方法。在多线程环境下，如果不加以控制，同时进行的存款和取款操作可能会导致余额计算错误。这时，我们可以使用互斥锁来确保同一时间只有一个操作能访问和修改余额。

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// BankAccount 结构体包含余额和一个互斥锁
type BankAccount struct {
	balance int
	mutex   sync.Mutex
}

// NewBankAccount 初始化一个新的银行账户
func NewBankAccount(initialBalance int) *BankAccount {
	return &BankAccount{
		balance: initialBalance,
	}
}

// Deposit 向账户存入金额
func (a *BankAccount) Deposit(amount int) {
	a.mutex.Lock()
	defer a.mutex.Unlock()

	a.balance += amount
	fmt.Printf("Deposited %d, new balance: %d\n", amount, a.balance)
}

// Withdraw 从账户提取金额
func (a *BankAccount) Withdraw(amount int) {
	a.mutex.Lock()
	defer a.mutex.Unlock()

	if amount <= a.balance {
		a.balance -= amount
		fmt.Printf("Withdrew %d, new balance: %d\n", amount, a.balance)
	} else {
		fmt.Printf("Insufficient funds for withdrawal of %d\n", amount)
	}
}

func main() {
	account := NewBankAccount(1000)

	// 使用goroutines模拟并发的存款和取款操作
	go func() {
		account.Deposit(500)
	}()

	go func() {
		account.Withdraw(200)
	}()

	// 等待一段时间以确保goroutines有机会执行
	time.Sleep(time.Second)
}
```

#### Mutex 有几种模式

mutex 有两种模式：**normal** 和 **starvation**

1. **正常模式**：这是`sync.Mutex`的默认行为。当一个goroutine试图获取锁时，如果锁已被其他goroutine持有，则该goroutine会被放置到一个等待队列中。一旦锁被释放，等待队列中的第一个goroutine将获得锁并继续执行。这种模式下，新到达的goroutine有机会立即获取锁，只要它在检查锁状态时发现锁是可用的。

2. **饥饿模式**：如果一个等待获取锁的goroutine等待时间超过了某个阈值（当前默认是1毫秒），或者已经存在等待的goroutine被唤醒但未能获得锁，`Mutex`可能会进入饥饿模式。在这种模式下，锁不再允许新的请求者直接获取锁，而是确保等待队列中的goroutine按照它们排队的顺序获得锁，哪怕锁在短时间内被释放和重新获取。这有助于避免某些goroutine长期无法获得锁的情况，即所谓的“饥饿”现象。

这两种模式的切换是由Mutex内部自动管理的，并且是透明的对用户代码而言，用户不需要直接控制或选择Mutex的工作模式。通过这种设计，Go的Mutex既能够高效地处理大多数并发场景，又能避免在某些情况下goroutine可能遭遇的不公平调度问题。

#### Mutex有几种状态

在Go语言中，`sync.Mutex`的内部状态可以通过其`state`字段来追踪，这个字段是一个原子整数，通常被划分为几个部分来表示不同的状态。虽然具体的实现细节可能随着Go版本的更新有所变化，但通常`Mutex`的状态可以抽象为以下几个关键部分：

1. **Locked**: 这一位表示Mutex是否被锁定。如果为1，则表示锁已经被某个goroutine持有；如果为0，则表示锁是未锁定的。
2. **Woken**: 或称为`WokenUp`，这一位用来标记是否有goroutine因为等待这个Mutex而被唤醒。如果为1，表示至少有一个goroutine曾经因为锁的释放而被唤醒过；如果为0，则表示没有goroutine因锁而被唤醒。
3. **Starving**: 或称为`Starvation`, 表示Mutex是否进入了饥饿模式。如果为1，说明Mutex已经检测到有goroutine可能处于饥饿状态，并调整策略以避免进一步的饥饿现象；如果为0，则表示正常模式。
4. **WaiterCount**: 这部分通常不是单独的一位，而是几个位组合起来表示等待该Mutex的goroutine的数量。这个值在解锁时用于决定是否需要通过信号量（`sema`字段）释放等待的goroutine。

需要注意的是，这些状态位的具体划分和解释是基于Go语言的内部实现细节，对于普通用户编写代码时通常不需要直接操作这些状态位，而是通过调用`Lock()`和`Unlock()`方法来安全地控制Mutex。

#### 无缓冲的 channel 和 有缓冲的 channel 的区别？

无缓冲的 Channel（`Unbuffered Channel`）和有缓冲的 Channel（`Buffered Channel`）在Go语言中提供了不同的通信方式，主要区别在于数据传输的同步性和异步性，以及它们如何处理发送和接收数据的方式：

**无缓冲的 Channel （Unbuffered Channel）**

1. **同步性**：无缓冲的Channel保证了严格的同步性。发送者必须等待接收者准备好接收数据后才能继续执行，同样，接收者也必须等待有数据发送过来才能继续。这意味着数据的发送和接收操作是配对进行的，确保了操作的顺序性。
2. **阻塞行为**：在无缓冲Channel上发送数据时，如果没有接收者准备好接收，发送操作会阻塞直到有接收者出现。同样，尝试从无缓冲Channel接收数据而此时没有发送者时，接收操作也会阻塞。
3. **数据交换点**：无缓冲Channel可以看作是两个Goroutine之间的直接握手点，确保了数据传递的即时性和顺序执行。

**有缓冲的 Channel （Buffered Channel）**

1. **异步性**：有缓冲的Channel提供了弱同步或某种程度上的异步通信。它包含一个固定大小的缓冲区，允许数据在没有直接匹配的接收者时暂时存储。
2. **阻塞与非阻塞**：当缓冲区未满时，发送数据到有缓冲Channel的操作不会阻塞，数据会被立即放入缓冲区。反之，如果缓冲区已满，发送操作会阻塞直到有空间。同样，从有缓冲Channel接收数据时，如果缓冲区中有数据则立即返回，否则接收操作会阻塞直到有数据到来。
3. **流量控制**：缓冲区的存在可以作为一种简单的流量控制机制，允许发送者在接收者处理速度较慢时短暂累积数据，或者在发送速率高于消费时暂存数据。

> 无缓冲Channel强调了精确的同步，适合需要严格控制数据流动顺序和时机的场景。而有缓冲Channel提供了更大的灵活性，特别适用于生产者消费者模型，其中数据产生和消费速率可能不完全同步的情况。选择哪种类型的Channel取决于具体的并发需求和程序逻辑。

#### Go语言中，什么时候会发生阻塞？阻塞时调度器会怎么做？

**在Go语言中，阻塞通常发生在以下几种情况：**

1. **同步操作**：当一个goroutine尝试通过一个无缓冲的channel发送或接收数据，但没有对应的接收者或发送者准备好时，它会阻塞，直到另一端的操作完成。
2. **互斥锁（Mutex）等待**：当一个goroutine尝试获取一个已经被其他goroutine持有的Mutex时，它会阻塞，直到Mutex被释放。
3. **系统调用**：执行IO操作（如文件读写、网络请求）或等待外部事件（如信号）的goroutine会阻塞，直到操作完成或事件发生。
4. **Select语句等待**：如果`select`语句中的所有case都无法立即执行（例如所有的channel都不可用），并且没有default分支，那么执行`select`的goroutine也会阻塞。
5. **Sleep或等待channel关闭**：使用`time.Sleep`让当前goroutine暂停指定时间，或者等待一个channel被关闭（通过只接收操作）也会造成阻塞。

**当goroutine发生阻塞时，Go的调度器（Goroutine Scheduler）会采取以下措施：**

- **检测与转移**：调度器能够检测到goroutine的阻塞状态，并将其从可运行队列（Runnable Queue, 或称为P的本地队列）移出，放入相应的等待队列（如channel的接收或发送队列、Mutex等待队列等）。
- **切换执行**：调度器会从等待的goroutine中切换出来，选择其他就绪的goroutine继续执行，确保CPU资源的有效利用。这涉及到goroutine上下文的保存与恢复过程。
- **唤醒与重调度**：一旦阻塞的原因解除（比如channel有了可接收的数据，Mutex被释放，系统调用完成等），相应的goroutine会被唤醒，并被放回可运行队列，等待被调度器再次执行。
- **饥饿避免**：Go的调度器还包含机制来避免goroutine饥饿，比如当检测到某些goroutine长时间无法获得执行机会时，可能会调整调度策略，如改变goroutine的调度优先级，以减少饥饿现象。

#### Goroutine 在什么情况会发生内存泄露？如何避免

1. **未关闭的Channel**：如果一个goroutine用于发送数据到一个channel，但没有地方接收这些数据，且channel永远不被关闭，那么发送goroutine会永久阻塞。这不仅会导致goroutine泄漏，还会因为channel中累积的数据无法被垃圾回收而造成内存泄漏。
2. **无限阻塞的Goroutine**：任何无限期阻塞的goroutine（例如等待永远不会发生的条件、无限循环没有退出条件等）都会占用内存且不会被垃圾回收，从而导致内存泄漏。
3. **未正确管理的Goroutine生命周期**：如果程序没有适当的机制来确保所有启动的goroutine都能在合适的时候结束（例如使用`sync.WaitGroup`、`context.Context`或通道关闭作为信号），那么未完成的goroutine会持续占用资源，导致内存泄漏。

**为了避免Goroutine引起的内存泄漏，可以采取以下措施：**

- **正确使用和关闭Channel**：确保发送到channel的数据会被接收，并在适当的时候关闭channel。当channel不再使用时，应该显式关闭，以通知接收方停止等待，避免发送goroutine阻塞。
- **使用超时或取消机制**：为可能无限等待的goroutine设置超时或者提供取消信号，例如使用`context.Context`。这样，即使操作不能按预期完成，也可以及时结束goroutine。
- **管理Goroutine生命周期**：利用`sync.WaitGroup`来等待一组goroutine完成，或使用`context.Context`来传播取消信号，确保所有goroutine在工作完成或被取消时能正确退出。
- **避免无限制的递归或循环**：确保任何递归调用或循环都有明确的退出条件，防止无限循环导致的goroutine和内存泄漏。
- **定期检查和监控**：利用Go的pprof工具定期进行性能分析，特别是goroutine分析，以发现潜在的阻塞或泄漏问题。及早发现并修复这些问题。

#### 什么是短暂性内存泄露和永久性内存泄露

**短暂性内存泄露（Transient Memory Leak）**

短暂性内存泄露指的是程序在特定操作或时间段内发生的内存泄露，但这种情况是暂时的，一旦特定条件满足或操作完成，泄露的内存会自动被回收或者可以通过程序的后续行为得到解决。这类泄露可能由于以下原因引起：

- **临时性的资源分配未及时清理**：比如在处理特定请求或事件时分配的内存，在事件处理完毕后忘记释放。
- **周期性任务中的遗漏**：某些周期性执行的任务可能在某次执行中因逻辑错误未释放内存，但在下次执行时恢复正常。
- **缓存或池未有效管理**：动态缓存或对象池未按预期淘汰旧数据，但机制本身设计合理，理论上可以恢复。

短暂性内存泄露往往通过优化代码逻辑、增加清理机制或修正特定情况下的错误即可解决，对程序的长期运行影响相对有限。

**永久性内存泄露（Persistent Memory Leak）**

永久性内存泄露则是指程序中存在持续存在的内存泄露问题，每次发生泄露后，泄露的内存都不会被回收，随着时间推移，泄露的内存不断累积，最终可能导致应用程序耗尽所有可用内存资源，影响其稳定性和性能，严重时可导致崩溃或无法继续运行。

- **循环引用**：特别是在使用自动垃圾回收的语言中，对象间的循环引用可能导致垃圾回收器无法识别并回收不再使用的对象。
- **静态变量滥用**：静态变量或全局变量生命周期与程序相同，如果错误地将大量数据存储在静态变量中且不及时清理，会导致永久泄露。
- **资源管理错误**：对文件描述符、数据库连接等资源的不当管理也可能导致永久泄露，尽管这更多时候被视为资源泄露而非纯粹的内存泄露。

永久性内存泄露的解决通常需要深入分析代码逻辑，修复内存管理的缺陷，有时还需要借助内存分析工具来定位问题根源。

#### Go的垃圾回收机制是怎么样的？

Go1.3之前采⽤**标记清除法**， Go1.3之后采⽤**三⾊标记法**，Go1.8采⽤**三⾊标记法+混合写屏障。**

1. **标记清除法**

   - 在标记清除算法中，首先从根对象（如全局变量、栈中的引用等）出发，标记所有可达对象。这一过程通常使用广度优先搜索进行。标记的方式通常是将对象的标记位从未标记改为已标记。所有的可达对象都被标记为"活动"或"存活"。

   - 在清扫阶段，遍历整个堆内存，将未被标记的对象视为垃圾，即不再被引用。所有未被标记的对象都将被回收，它们的内存将被释放，以便后续的内存分配。

   - 标记清除算法执⾏完清扫阶段后，可能会产⽣内存碎⽚，即⼀些被回收的内存空间可能是不连续的。为了解决这个问题，⼀些实现中可能会进⾏内存碎⽚整理。

   - 标记清除算法的主要优势是能够回收不再使⽤的内存，但它也有⼀些缺点。其中⼀个主要的缺点是清扫阶段可能会引起⼀定程度的停顿，因为在这个阶段需要遍历整个堆内存。另外，由于标记清除算法只关注“存活”和 “垃圾”两种状态，不涉及内存分配的具体位置，可能导致内存碎⽚的产⽣。

2. **三色标记法**

   三色标记法是一种经典的垃圾回收算法，它将程序中的所有对象分为三种颜色：

   - **白色（White）**：表示对象尚未被扫描，可能是垃圾。
   - **灰色（Gray）**：表示对象已经扫描过，但其直接引用的对象还未完全扫描。
   - **黑色（Black）**：表示对象及其所有直接引用的对象都已经扫描过，是已知的存活对象。

   在Go的垃圾回收过程中，初始时所有对象都是白色，然后从根对象（如全局变量、栈上的指针等）开始，将它们标记为灰色。垃圾回收器会遍历灰色对象，并将其直接引用的对象标记为灰色，同时将该对象标记为黑色。这个过程会一直进行，直到没有灰色对象为止，此时所有可达对象都会被标记为黑色，而未被标记的白色对象则被认为是垃圾，可以在后续的清扫阶段被回收。

3. **混合写屏障**

在Go 1.8之前，Go的垃圾回收已经使用了插入写屏障（Insertion Write Barrier），用于维护三色标记法中的不变性，确保新创建或修改的引用关系不会导致可达性分析出错。然而，这仅在堆上生效，对于栈上的对象，仍需要在STW阶段进行扫描。

Go 1.8引入了混合写屏障机制，它结合了插入写屏障和删除写屏障的优点，不仅在对象被新创建或引用关系改变时起作用（插入写屏障），还在对象的引用被删除时起作用（删除写屏障）。这种机制的引入，使得栈上的对象在GC周期开始时直接标记为黑色，无需在标记阶段扫描栈，大大减少了STW的时间，同时也提高了垃圾回收的并发程度和效率。

混合写屏障的另一个特点是它不会对栈空间启用写屏障，因为栈上的对象生命周期较短且行为可预测，这样做可以降低写屏障带来的性能开销。此外，新创建的对象直接标记为黑色，意味着它们默认被视为活跃对象，这虽然可能导致少量的“假阳性”（即错误地保留了一些实际无用的对象），但极大地简化了算法，并减少了对程序运行时的影响。

综合来看，Go 1.8的三色标记法配合混合写屏障机制，实现了更为高效和低延迟的垃圾回收，这对于构建高性能并发服务和大规模分布式系统尤为重要。

4. **三色标记法 + 混合写屏障 （Go 1.8后）**

基于插⼊写屏障和删除写屏障在结束时需要STW来重新扫描栈，带来性能瓶颈。**混合写屏障**分为以下四步：

1. GC开始时，将栈上的全部对象标记为黑色（不需要二次扫描，无需STW）
2. GC期间，任何栈上创建的新对象均为黑色
3. 被删除引用的对象标记为灰色
4. 被添加引用的对象标记为灰色

总之就是确保黑色对象不能引用白色对象，这个改进直接使得GC时间从 2s 降低到 2us。

**Go 1.8后的 GC流程**

　　1.初始将所有栈上对象全部置黑，新增加的栈对象也置黑。（栈上不启动屏障，只在堆上启动）

　　2.扫描过程中，插入的对象置灰，删除的对象也置灰。

> **强三色不变式**：强制性不允许黑色对象引用白色对象（破坏条件1）。
>
> **弱三色不变式**：允许黑色对象引用白色对象，但是必须保证白色对象要被别的灰色对象引用（破坏条件2）。 

#### GC 如何调优

Go语言的垃圾回收（GC）调优是一个涉及多个方面的过程，旨在减少垃圾回收引起的暂停时间（STW）并提高程序的整体性能。以下是一些常见的GC调优策略：

1. **调整GC百分比目标（GOGC环境变量）**:
   - `GOGC`环境变量控制了垃圾回收器的目标内存增长比例，默认值是100，意味着每次GC后，堆内存可以增长100%。降低此值会导致垃圾回收更频繁地发生，每次回收后内存增长的比例减小，引起更多的短暂停顿（STW）。反之，增加此值可能会减少STW频率，但可能导致更高的内存使用。

2. **通过 go tool pprof 和 go tool trace 等⼯具**
   - 控制内存分配的速度，限制 Goroutine 的数量，从⽽提⾼赋值器对 CPU的利⽤率。
   - 尽量复用对象，减少频繁的内存分配，例如使用sync.Pool来缓存和重用临时对象。
   - 需要时，增⼤ GOGC 的值，降低 GC 的运⾏频率

####   GMP（`重要`）

Go语言中的GMP模型是其并发和调度的核心机制，由三个关键组件构成：Goroutines（G）、 Machines（M）和Processors（P）。这个模型的设计目的是为了高效地管理并发执行和资源分配，同时尽量减少上下文切换的开销。下面是每个组件的简要说明：

1. **Goroutines (G)**:
   - G代表Go中的轻量级线程，称为goroutine。每个goroutine对应一段可并发执行的代码，用户可以通过`go`关键字轻松创建。Goroutines的调度成本很低，使得Go程序能同时运行成千上万的并发任务。
2. **Machines (M)**:
   - M代表操作系统级别的线程，也称作工作者线程。每个M负责执行具体的计算任务，即执行goroutine。M的数量可动态调整，与硬件CPU核心数量不一定相等，但至少会有一个M。M会与P绑定，从P的本地队列或全局队列中获取G来执行。
3. **Processors (P)**:
   - P代表逻辑处理器，也叫工作单元，它负责调度goroutine到M上执行。P的数量决定了Go程序可以并行运行的goroutine的最大数量（尽管实际并发度还受限于M的数量）。P维护一个可运行goroutine的本地队列，并且管理一些资源，如缓存的内存分配信息。所有的P共享一个全局队列来存放等待执行的goroutine。

**工作流程**:

- 当一个新的goroutine被创建时，它会被加入到某个P的本地队列或全局队列中。
- M会从与之绑定的P的本地队列中取出一个goroutine来执行。如果P的本地队列为空，P会尝试从其他P的队列中偷取goroutine，或者从全局队列中获取。如果没有可运行的goroutine，M会进入休眠状态，直到新的goroutine可用。
- 当一个goroutine遇到IO操作或系统调用而阻塞时，与其绑定的M会解除与P的绑定，让P可以被其他M使用，同时M会尝试从全局队列中获取新的goroutine来执行，或者进入休眠。
- 垃圾回收（GC）也是在这个框架下进行的，通常会在尽量减少STW（Stop-The-World）的情况下并发执行。

通过这种设计，Go语言的GMP模型能够在不牺牲过多性能的前提下，实现高效的并发执行和资源管理。

**工作窃取（Work Stealing）**

工作窃取是GMP模型中用于[负载均衡](https://cloud.tencent.com/product/clb?from_column=20065&from=20065)的主要策略。当一个处理器（P）上的本地运行队列中的`goroutines`都已经被分配给线程（M）执行时，这个P就会尝试从其他P的队列中“偷取”一半的`goroutines`来执行。这种策略可以确保所有的处理器都尽可能地保持忙碌状态，从而提高整体的CPU利用率。

**手动与自动栈增长**

Go语言的`goroutines`拥有非常小的初始栈空间，通常只有几KB。这个栈会根据需要自动增长和缩减。当`goroutine`的栈空间不足时，Go运行时会自动检测这一情况并分配更多的栈空间，这个过程对程序员来说是透明的。这种自动栈管理机制减少了程序员在编写代码时需要考虑的内存管理问题，同时也保证了内存的高效使用。

**系统调用与网络轮询器的影响**

当`goroutine`进行系统调用，如文件操作或网络I/O时，这可能会导致它被阻塞。在传统的线程模型中，这会导致整个线程被阻塞，从而浪费宝贵的CPU资源。

在Go中，当一个`goroutine`进行系统调用时，它所在的线程（M）会被阻塞，但Go运行时会尝试将该线程（M）上的处理器（P）分配给其他的线程（M），这样其他的goroutines就可以继续执行，从而避免了CPU资源的浪费。

此外，Go语言还提供了一个网络轮询器（netpoller），它是一个高效的多路复用器，用于监控网络I/O事件。当goroutine等待网络I/O时，它会被放入网络轮询器，而不是阻塞线程。一旦I/O操作准备就绪，网络轮询器会唤醒相应的goroutine，这时goroutine会重新进入调度器的运行队列，等待执行。

>  GMP模型的调度策略是Go语言高效并发的关键所在。这些策略确保了`goroutines`能够平滑地在多核心处理器上运行，同时最小化了上下文切换和同步的开销。下面我们来详细探讨这些策略。

#### Go中的内存逃逸是什么？

内存逃逸（Memory Escape）是指⼀个变量在函数内部创建，但在函数结束后仍然被其他部分引⽤，导致变量的⽣命周期超出了函数的范围，从⽽使得该变量的内存需要在堆上分配⽽不是在栈上分配。

**内存逃逸的情况可能发生在以下几种情况：**

**1. 当在函数内部创建⼀个局部变量，然后返回该变量的指针，⽽该指针被函数外部的代码引⽤时，这个局部变量 会发⽣内存逃逸。**

```go
func createPointer() *int {
     x := 42
     return &x // x 的内存逃逸
}
```

**2. 当将局部变量通过 channel 或 goroutine 传递给其他部分，⽽这些部分可能在原始函数退出后访问这个变量 时，也会导致内存逃逸。**

```go
func sendData(ch chan<- *int) {
     x := 42
     ch <- &x // x 的内存逃逸
}
```

**3. 如果在函数内部使⽤  new 或  make 分配的变量，即使返回的是指针，但这个指针可能被外部持有，从⽽导致 变量在堆上分配⽽不是在栈上分配。**

```go
func createWithNew() *int {
     x := new(int) // x 的内存逃逸
     return x
 }

```

**4. 大对象或数组：**当局部变量的大小超过了栈的分配阈值时，为了防止栈溢出，这些大的对象或数组会被分配到堆上。

> 理解内存逃逸对于编写高性能的Go代码至关重要，因为它直接关系到程序的内存使用效率和垃圾回收的频率。通过合理的代码设计，开发者可以尽量减少内存逃逸的发生，例如通过值传递而非指针、限制数据结构的大小、避免不必要的闭包引用等手段。

#### CAP理论为什么不能同时满足？

CAP 理论是分布式系统设计中的三个基本属性，它们分别是⼀致性（Consistency）、可⽤性（Availability）、和 分区容错性（Partition Tolerance）。CAP 理论由计算机科学家 Eric Brewer 在2000年提出。该理论指出，在一个分布式系统中，由于网络的不确定性和分区的可能性，设计者无法同时确保系统满足以下三个特性：

1. **一致性（Consistency）**：所有节点在同一时间看到的数据都是相同的，或者说，每次读取都能获取到最近一次成功写入的数据。这意味着系统需要在写操作之后进行数据同步，确保所有副本的数据状态一致。
2. **可用性（Availability）**：系统在面对请求时总能即时响应，不会因为处理中的部分失败而拒绝服务。这里强调的是系统能够在有限的时间内对用户的大多数请求给出非错误的响应。
3. **分区容错性（Partition tolerance）**：即便系统中的网络因为各种原因（如网络延迟、断网、故障等）被分割成多个独立的区域（分区），系统仍能继续运行并对外提供服务。

在实际的分布式系统中，由于网络分区是不可避免的（即P是必须要保证的），设计者不得不在C（一致性）和A（可用性）之间做出权衡。具体来说：

- 如果选择优先保证一致性（C），当发生网络分区时，系统可能需要阻塞某些操作，等待数据同步完成，这样虽然保证了数据的一致性，但可能会牺牲可用性，因为部分请求可能在此期间无法得到响应。
- 如果选择优先保证可用性（A），则在分区发生时，系统会允许各分区继续处理请求，可能会返回旧的数据或者暂时不一致的数据给用户，从而牺牲了一致性。

因此，CAP理论表明，在存在网络分区的现实情况下，一个分布式系统不可能同时达到强一致性、高可用性和分区容错性这三个目标。设计者需要根据系统的具体需求，决定是在CA（放弃P，假设没有网络分区）、CP（放弃A，在分区时可能拒绝服务）还是AP（放弃C，提供最终一致性）之间做出选择。

#### goroutine 在什么情况下会被挂起呢？

goroutine被挂起也就是调度器重新发起调度更换P来执⾏时

- 在channel堵塞的时候
- 在垃圾回收的时候;
- sleep休眠
- 锁等待
- 抢占
- IO阻塞

#### 主goroutine与其他goroutine有什么不同

类似于⼀个进程总会有⼀个主线程，每⼀个独⽴的go程序在运⾏时也总会有⼀个主goroutine，主goroutine是⾃动 启⽤⽽不需要⼿动操作的，每条go语句（启⽤⼀个goroutine的语句）⼀般都会携带⼀个函数调⽤，这个调⽤的函 数被称为go函数，⽽主goroutine的go函数就是作为程序⼊⼝的main函数

从main函数的⻆度来理解主goroutine，则主goroutine就是程序运⾏的主程序，其他goroutine执⾏的程序是被异步调⽤的，同时主goroutine的结束也就意味着整个进程的结束。



#### 其他

```go
func main() {
	for i := 0; i < 10; i++ {
		go func() {
			fmt.Println(i)
		}()
	}
}
```

**Q: 这段代码会输出什么？**

这段代码在主goroutine中进⾏了⼗次go语句调⽤，也就是启⽤了⼗个goroutine（因为执⾏⼀条go语句时go的 runtime总是会优先从存放有空闲G的队列中获取⼀个G，没有空闲的情况下才会创建新的G，所以叫启⽤ goroutine更合适）来打印出i的值。

需要注意的是go函数真正被执⾏的时间⼀定总是滞后于所属的go语句被执⾏的时间的（因为GMP调度器需要按先 进先出的顺序来执⾏G），⽽go语句本身执⾏完毕后如果不加⼲涉则不会等待其go函数的执⾏，会⽴刻去执⾏后⾯ 的语句，所以for循环会很快的执⾏完，此时的那些go函数很可能还没有执⾏，此时i的值已经为10

另外当for语句执⾏完毕后主goroutine便结束了，则那些还未被执⾏的go函数将不会继续执⾏，即不会输出内容所以对于以上代码，绝⼤多数情况下不会有任何输出，也可能会输出乱序的0到9或是10个10
