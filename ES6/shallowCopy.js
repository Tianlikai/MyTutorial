/**
 * 浅拷贝
 * 1 Object.assign()
 * 2 es6 结构
 * 3 一层循环
 */

 /**
  * 浅复制
  */
function shallowCopy(source) {
  let result = {};
  for(let key in source) {
    if (source.hasOwnProperty(key)) {
      result[key] = source[key]
    }
  }
  return result;
}
