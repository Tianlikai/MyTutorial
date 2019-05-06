/**
 *
 * @param {Function} fn 第一个参数为函数
 * @returns {Function} fn
 */
function sub_curry(fn) {
  const args = [].slice.call(arguments, 1);
  return function hiCurry() {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {
  length = length || fn.length;
  const slice = Array.prototype.slice;
  return function hiCurry() {
    const argLen = arguments.length;
    if (argLen < length) {
      const combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - argLen);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

const fn = curry(function(a, b, c) {
  return [a, b, c];
});

fn("1");
