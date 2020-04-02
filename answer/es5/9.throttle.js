function throttle(func, wait) {
  let [lastThis, lastArgs, timer, firstTag] = [
    undefined,
    undefined,
    null,
    true
  ];

  wait = +wait || 0;

  function innvoke() {
    const [self, args] = [lastThis, lastArgs];
    clearTimeout(timer);
    [lastThis, lastArgs, timer] = [null, null, null];
    if (self && args) {
      func.apply(self, args);
    }
  }

  function throttled(...args) {
    [lastThis, lastArgs] = [this, args];
    if (firstTag) {
      firstTag = false;
      innvoke();
    }
    if (timer) return;
    timer = setTimeout(innvoke, wait);
  }
  return throttled;
}
