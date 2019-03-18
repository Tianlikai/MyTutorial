function debounce(func, wait) {
  let lastArgs;
  let lastThis;
  let result;
  let timerId;
  let lastCallTime;

  if (typeof func !== "function") {
    throw new TypeError("func 类型应该为 function");
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeWaiting = wait - timeSinceLastCall;
    return timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    return lastCallTime === undefined || timeSinceLastCall >= wait;
  }

  function fulfilled(time) {
    timerId = undefined;
    if (lastArgs) {
      const args = lastArgs;
      const self = lastThis;
      result = func.apply(self, args);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return fulfilled(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function startTimer(timerExpired, wait) {
    return setTimeout(timerExpired, wait);
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastCallTime = time;
    lastThis = this;
    lastArgs = args;
    if (isInvoking && timerId === undefined) {
      return (timerId = startTimer(timerExpired, wait));
    }
    return result;
  }

  return debounced;
}
