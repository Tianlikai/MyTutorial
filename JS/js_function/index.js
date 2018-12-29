/**
 * 实现函数的中间步骤缓存
 * @param {*} func 传入的函数
 */
function memorize(func) {
  var cache = {};
  return function() {
    var key = arguments.length + Array.prototype.join.call(arguments, ",");
    if (key in cache) {
      return cache[key];
    } else {
      return (cache[key] = func.apply(null, arguments));
    }
  };
}

function gcb(a, b) {
  var t;
  if (a < b) {
    t = b;
    b = a;
    a = t;
  }
  while (b != 0) {
    t = b;
    b = a % b;
    a = t;
  }
  return a;
}

var gcdMemo = memorize(gcb);
let res = gcdMemo(85, 187);
// console.log(res);

function factorial(n) {
  if (isFinite(n) && n > 0 && Math.round(n) === n) {
    if (!(n in factorial)) {
      factorial[n] = n * factorial(n - 1);
    }
    return factorial[n];
  } else {
    return NaN;
  }
}
factorial[1] = 1;
let a = factorial(10);
let b = factorial(1);

var factorial2 = memorize(function(n) {
  return n <= 1 ? 1 : n * factorial2(n - 1);
});

factorial2(5);
factorial2(4);
