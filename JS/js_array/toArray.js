/**
 * 将类数组对象转换为真正的数组
 * @param {*} target 类数组对象
 * @param {*} n 截取数组起始点
 */
function toArray(target, n) {
  return Array.prototype.slice.call(target, n || 0);
}
/**
 * @return {obj} arguments 为类数组对象
 */
function test() {
  const args = arguments;
  let arr = toArray(args);
  console.log(arr);
}

test(1, 2, 3, 4);
