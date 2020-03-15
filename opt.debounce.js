/**
 * 防抖动函数
 * 等最后一次触发结束一段时间以后，再去执行
 * @param {*} func 要执行的函数
 * @param {*} wait 时间间隔
 * @param {*} maxWait 主动触发最大时间间隔，默认3000毫秒
 */
function debounce(func, wait, maxWait) {
  let lastThis;
  let lastArgs;
  let lastInvokeTime;
  let timer = null;
  let result;

  wait = +wait || 0;
  maxWait = +maxWait || 3000;

  function invokeFunc() {
    const self = lastThis;
    const args = lastArgs;
    lastThis = undefined;
    lastArgs = undefined;
    lastInvokeTime = undefined;
    clearTimeout(timer);
    timer = null;
    if (self && args) {
      result = func.apply(self, args);
    }
    return result;
  }

  function debounced(...args) {
    const now = Date.now();
    lastThis = this;
    lastArgs = args;
    lastInvokeTime = lastInvokeTime || now;
    clearTimeout(timer);
    if (now - lastInvokeTime > maxWait) {
      lastInvokeTime = now;
      invokeFunc();
    } else {
      timer = setTimeout(invokeFunc, wait);
    }
  }
  return debounced;
}
