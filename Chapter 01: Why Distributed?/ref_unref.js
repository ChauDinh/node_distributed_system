const t1 = setTimeout(() => {
  console.log('Hello from t1');
}, 1_000_000);
const t2 = setTimeout(() => {
  console.log('Hello from t2');
}, 2_000_000);

t1.unref();

clearTimeout(t2);

/**
 * There is now one asynchronous operation keeping Nodejs alive. The process should be end in 1000 seconds.
 * 
 * There are now two such operation. The process should end in 2000 seconds.
 * 
 * The t1 timer has been unreferenced. Its callback can still run in 1000 seconds but it won't keep the process alive
 * 
 * The t2 timer has been cleared and will never run. A side effect of this is that it no longer keeps the process
 * alive. With no remaining asynchronous operations keeping the process alive, the next iteration of the event loop
 * ends the process.
 */

