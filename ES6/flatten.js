var arr = [1, [2, [3, 4, [5, [6, 7, [8, [9, [[12], 10], 11]]]]]]];

/**
 * 展平多重数组
 *
 * 方法一 递归
 * @param {*} array
 */
function flatten1(array) {
  var result = [];
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] instanceof Array) {
      result = result.concat(flatten1(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
}
var res1 = flatten1(arr);
console.log(res1);

/**
 * 方法二 reduce
 * @param {*} array
 */
function flatten2(array) {
  return array.reduce(
    (prev, next) => prev.concat(Array.isArray(next) ? flatten2(next) : next),
    []
  );
}
var res2 = flatten2(arr);
console.log(res2);

function flatten3(array) {
  while (array.some(item => Array.isArray(item))) {
    array = [].concat(...array);
  }
  return array;
}
var res3 = flatten3(arr);
console.log(res3);

module.exports = flatten1;
