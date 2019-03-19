/**
 * 节流函数
 *
 * 计时器实现
 * 没有实现 requestAnimationFrame 优化
 * @param {*} func
 * @param {*} maxWait
 */
function throttle(func, maxWait) {
  let lastThis;
  let lastArgs;
  let firstTag = false;
  let timerId = null;
  let result;

  maxWait = +maxWait || 0;

  function invokeFunc() {
    const self = lastThis;
    const args = lastArgs;
    lastThis = undefined;
    lastArgs = undefined;
    clearTimeout(timerId);
    timerId = null;
    if (self && args) {
      result = func.apply(self, args);
    }
    return result;
  }

  function throttled(...args) {
    lastThis = this;
    lastArgs = args;

    if (!firstTag) {
      firstTag = true;
      invokeFunc();
    }
    if (timerId) return;
    timerId = setTimeout(invokeFunc, maxWait);
  }

  return throttled;
}
