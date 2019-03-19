/**
 * 防抖函数
 * 计时器实现
 * 没有实现 requestAnimationFrame 优化
 * @param {*} func
 * @param {*} wait
 * @param {*} maxWait
 */
function debounce(func, wait, maxWait) {
  let lastThis;
  let lastArgs;
  let lastInvokeTime;
  let timerId = null;
  let result;

  wait = +wait || 0;
  maxWait = +maxWait || 3000;

  function invokeFunc() {
    const self = lastThis;
    const args = lastArgs;
    lastThis = undefined;
    lastArgs = undefined;
    lastInvokeTime = undefined;
    clearTimeout(timerId);
    timerId = null;
    if (self && args) {
      result = func.apply(self, args);
    }
    return result;
  }

  function debounced(...args) {
    const time = Date.now();
    lastThis = this;
    lastArgs = args;
    lastInvokeTime = lastInvokeTime || time;
    clearTimeout(timerId);
    if (time - lastInvokeTime > maxWait) {
      lastInvokeTime = time;
      invokeFunc();
    } else {
      timerId = setTimeout(invokeFunc, wait);
    }
    return result;
  }

  return debounced;
}
