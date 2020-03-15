/**
 * 迭代器
 * 所谓迭代器，其实就是一个具有next()方法的对象，每次调用next都会返回一个结果对象，
 * 该结果有两个属性，value表示当前的值，done表示遍历是否结束
 */

/**
 * es5创建一个迭代器
 */
function createIterator(items) {
  let i = 0;
  return {
    next: function() {
      let done = i >= items.length;
      let value = done ? undefined : items[i++];
      return { value, done };
    }
  };
}

const iter1 = createIterator([1, 2, 3, 4]);
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());
console.log("-----------");
console.log("-----------");

/**
 * 我们可以用es6语法for of直接遍历迭代器
 * 只有部署了Iterator接口的属性才能使用迭代器
 * ES6规定默认的Iterator部署在数据结构的Symbol.iterator属性。
 * 或者说只要数据结构有Symbol.iterator属性，就是可遍历的。
 */
const obj1 = {};
obj1[Symbol.iterator] = () => createIterator([5, 6, 7]);
for (let v of obj1) {
  console.log(v);
}
/**
 * 由此可以发现，for of 遍历的其实是对象的Symbol.iterator属性
 */
console.log("-----------");
console.log("-----------");

/**
 * 默认可遍历对象
 * Array
 * Set
 * Map
 * 类数组
 */

/**
 * 模拟实现for of
 * 读取对象的Symbol.iterator属性，然后进行while循环
 * @param {*} object  迭代的对象
 * @param {*} cb for of语句中的循环体
 */
function forOf(object, cb) {
  if (typeof object[Symbol.iterator] !== "function") {
    throw new TypeError(`object is not iterator`);
  }
  if (typeof cb !== "function") {
    throw new TypeError("cb must be callable");
  }
  const iterator = object[Symbol.iterator]();
  let result = iterator.next();
  while (!result.done) {
    cb(result.value);
    result = iterator.next();
  }
}
const obj2 = {};
obj2[Symbol.iterator] = () => createIterator([8, 9, 10]);
forOf(obj2, value => console.log(value));
console.log("-----------");
console.log("-----------");

/**
 * 内建迭代器
 * Array.keys() 返回key
 * Array.values() 返回value
 * Array.entries() 返回[key, value]
 */
