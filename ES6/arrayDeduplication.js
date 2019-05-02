const array = [1, 1, 2, 2, 3, 4];

/**
 * 数组去重复
 *
 * 方法一 一层循环数组判重
 * @param {*} array
 */
function unique1(array) {
  const res = [];
  for (let i = 0; i < array.length; i += 1) {
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i]);
    }
  }
  return res;
}
const res1 = unique1(array);
console.log("第一种", res1);

/**
 * 方法二 排序后判断当前值是否等于上一个值，不需要新开空间
 * @param {*} array
 */
function unique2(array) {
  array = array.sort((a, b) => a - b);
  const res = [array[0]];
  for (let i = 1; i < array.length; i += 1) {
    if (array[i] !== array[i - 1]) {
      res.push(array[i]);
    }
  }
  return res;
}
const res2 = unique2(array);
console.log("第二种", res2);

/**
 * 方法三 set数据结构 Array.from转换
 * @param {*} array
 */
function unique3(array) {
  return Array.from(new Set(array));
}
const res3 = unique3(array);
console.log("第三种", res3);

/**
 * 方法四 set数据结构 拓展符号转换
 * @param {*} array
 */
function unique4(array) {
  return [...new Set(array)];
}
const res4 = unique4(array);
console.log("第四种", res4);

/**
 * 方法五 简化循环
 */
function unique5(array) {
  return array.filter((item, index, arr) => arr.indexOf(item) === index);
}
const res5 = unique5(array);
console.log("第五种", res5);

/**
 * 方法六 简化循环并且有序
 */

function unique6(array) {
  return array
    .sort((a, b) => a - b)
    .filter((item, index, arr) => !index || item !== arr[index - 1]);
}
const res6 = unique6(array);
console.log("第六种", res6);

/**
 * 拓展，map 是判重的最佳数据结构
 * 改方法可以用在此处，但是性能不是最佳
 */
