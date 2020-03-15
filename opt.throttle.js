/**
 * 节流函数
 * 首次立即执行，然后在一段时间内执行一次
 * @param {*} func 执行函数
 * @param {*} wait 时间间隔
 */
function throttle(func, wait) {
  let lastThis;
  let lastArgs;
  let firstTag = false;
  let timer = null;
  let result;

  wait = +wait || 0;

  function invokeFunc() {
    const self = lastThis;
    const args = lastArgs;
    lastThis = undefined;
    lastArgs = undefined;
    clearTimeout(timer);
    timer = null;
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
    if (timer) return;
    timer = setTimeout(invokeFunc, wait);
  }
  return throttled;
}
