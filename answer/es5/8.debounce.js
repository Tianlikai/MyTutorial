function debounce(func, wait, maxWait) {
  let [lastArgs, lastArgs, lastInvokeTime, timer] = [
    undefined,
    undefined,
    undefined,
    null
  ];

  wait = +wait || 0;
  maxWait = +maxWait || 3000;

  function innvoke(curentTime) {
    const self = lastThis;
    const args = lastArgs;
    clearTimeout(timer);
    [lastThis, lastArgs, lastInvokeTime, timer] = [
      null,
      null,
      curentTime,
      null
    ];
    if (self && args) {
      func.apply(self, ...args);
    }
  }

  function debounced(...args) {
    const now = Date.now();
    [lastThis, lastArgs, lastInvokeTime] = [this, args, now];
    clearTimeout(timer);
    if (curentTime - lastInvokeTime > maxWait) {
      innvoke(curentTime);
    } else {
      timer = setTimeout(innvoke, wait);
    }
  }
  return debounced;
}
