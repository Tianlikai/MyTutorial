/**
 * 迭代器
 * 所谓迭代器，其实就是一个具有 next() 方法的对象
 * 每次调用 next() 都会返回一个结果对象
 * 该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束。
 */
function createIterator(items) {
  var i = 0;
  return {
    next: function() {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;
      return {
        value,
        done
      };
    }
  };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }

/**
 * for of 遍历
 *
 * 可遍历数据结构
 * 该数据结构内部部署Iterator接口
 *
 * es6 默认部署Symbol.iterator接口
 * 1 数组
 * 2 Set
 * 3 Map
 * 4 类数组对象，如 arguments 对象、DOM NodeList 对象
 * 5 Generator
 * 6 字符串
 */

/**
 * 模拟实现forOf
 */
function forOf(obj, cb) {
  let iterable, result;
  if (typeof obj[Symbol.iterator] !== "function") {
    throw new TypeError(obj, "is not iterable");
  }
  if (typeof cb !== "function") throw new TypeError("cb must be callable");

  iterable = obj[Symbol.iterator]();
  result = iterable.next();
  while (!result.done) {
    cb(result.value);
    result = iterable.next();
  }
}
