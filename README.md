# Node.js Distributed System

This repo is my practice creating Distributed system with Node.js

## What we will cover?

- Why distributed?
- Protocols
- Scaling
- Security
- etc

```JS
setTimeout(() => console.log('A'), 0);
console.log('B');
setTimeout(() => console.log('C'), 100);
setTimeout(() => console.log('D'), 0);

let i = 0;
while (i < 1_000_000_000) {
  let ignore = Math.sqrt(i);
  i++;
}

console.log('E');
```

The first thing happens is the function to log A is scheduled with a timeout 0ms
Other words, it is scheduled to run as early as 0ms after the current stack ends.

Next the function log B method called directly, so it's the first to print.

Then the log C is scheduled to run as early as 100ms, and the log D is scheduled 
to happens as early as 0ms.

Then, the application gets busy doing calculation within the while loop, which eats up 
half a second CPU time.

Once that's done, the event loop looks more work to do. It checks the queue and sees
that there are three tasks scheduled to happen. The order of items in the queue is based
on the timer value and the order that the `setTimeout()` calls were made. 

So it first processes the log A function. The next time is the log D function and finally
the log C is run.

Overview:
Node.js fully embraces the **Continuation-Passing style (CPS)** pattern throughout its internal modules
by way callbacks.

In Node.js, functions that are invoked in the future with a new stack are said to be run *asynchronously*.
Conversely, functions calls another function in the same stack, that code is said to run *synchronously*.

## Parallel in Node.js

Since JavaScript applications are mostly run in single-thread manner, two call stacks won't exist at the same time. 
Which means that two functions cannot run in parallel in JS.

This implies that multiple copies of an application need to be run simultaneously  by some means to allow the 
application to scale.

We can use the built-in `cluster` module for routing HTTP requests to different application instances. And the 
built-in `worker_threads` module helps run multiple JavaScript instances at the same time. The `child_process` module
can be used to spawn and manage a full Node.js process.

However, with each of these solutions, JS still run only a single thread at a time within an application. 
This means with each solution, each JS environment still has its own distinct global variables, and no
object-references can be shared between them.

