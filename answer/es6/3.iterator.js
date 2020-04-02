/**
 * 迭代器可以理解为一个对象，该对象返回一个next方法，每次调用next方法返回一个对象{value: any, done: boolean}
 * done: 代表迭代器是否结束
 * value: 代表当前迭代器的值
 */
function createIterator(items) {
  let i = 0;
  return {
    next: function() {
      return i < items.length
        ? {
            done: false,
            value: items[i++]
          }
        : {
            done: true,
            value: undefined
          };
    }
  };
}

// const iterator = createIterator([1, 2, 3, 4]);
// let data;
// data = iterator.next();
// data = iterator.next();
// data = iterator.next();
// data = iterator.next();
// data = iterator.next();

/**
 * es6 的迭代器接口部署在数据结构的Symbol.iterator属性
 * 只要数据结构部署了Symbol.iterator属性，就可以用 for of 进行遍历
 */
const obj = {};
obj[Symbol.iterator] = () => createIterator([1, 2, 3]);
for (let n of obj) {
  console.log(n);
}
