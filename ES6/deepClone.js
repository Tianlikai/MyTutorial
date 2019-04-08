/**
 * 深拷贝 数组的两种方法
 * 1 let copy = Array.from(arr)
 * 2 let copy = [...arr]
 */

/**
 * 深拷贝实现方式
 * 1 JSON.stringify -》 JSON.parse
 * 2 递归拷贝
 * 3 Object.create()
 * ！注意式项目
 * 防止相互引用 陷入递归死循环
 */

/**
 * 2 递归拷贝
 */
function deepClone(old, target) {
  let copy = target || {};
  for (let key in old) {
    let oldObj = old[key];
    if (oldObj === copy) continue;
    if (typeof oldObj === "object") {
      copy[key] = oldObj.constructor === Array ? [] : {};
      deepClone(oldObj, copy[key]);
    } else {
      copy[key] = oldObj;
    }
  }
  return copy;
}

function deepClone2(old, target) {
  let copy = target || {};
  for (let key in old) {
    let oldObj = old[key];
    if (oldObj === copy) continue;
    if (typeof oldObj === "object") {
      copy[key] = oldObj.constructor === Array ? [] : Object.create(oldObj);
      deepClone2(oldObj, copy[key]);
    } else {
      copy[key] = oldObj;
    }
  }
  return copy;
}

function isObject(target) {
  if (target === null) return false;
  return Object.prototype.toString.call(target) === "[object Object]";
}

function myDeep(source) {
  let root = {};
  let stack = [source];

  while (stack.length) {
    let item = stack.pop();
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        if (isObject(item[key])) {
          stack.push(item[key]);
        } else if (item[key].constructor === Array) {
          root[key] = [];
        } else {
          root[key] = item[key];
        }
      }
    }
  }

  return root;
}

// test
let a = {
  name: "鹏哥",
  age: 18,
  v: {
    name: "tom"
  }
};

const copy = myDeep(a);
console.log(copy);
