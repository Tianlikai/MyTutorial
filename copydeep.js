const isObject = require("./isObject");
const type = require("./type");

/**
 * 深拷贝
 */
const obj = { a: { b: 2 } };

/**
 * 一行代码的深拷贝
 */
const clone1 = target => JSON.parse(JSON.stringify(target));
const c1 = clone1(obj);
c1.a.b = 1;
console.log("c1:");
console.log(obj);
console.log(c1);

/**
 * 简单递归克隆
 */
function clone2(target) {
  if (isObject(target)) {
    const result = {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        const value = target[key];
        if (isObject(value)) {
          result[key] = clone2(value);
        } else {
          result[key] = value;
        }
      }
    }
    return result;
  }
  return target;
}
const c2 = clone2(obj);
c2.a.b = 1;
console.log("c2: ");
console.log(obj);
console.log(c2);

function clone3(source) {
  const root = {};
  // 初始化栈
  const stack = [{ parent: root, key: undefined, value: source }];
  // 深度优先遍历，先入后出
  while (stack.length) {
    const node = stack.pop();
    const { parent, key, value } = node;

    // key undefined赋值到root,否则复制到子节点
    let result = type(key) === "undefined" ? parent : (parent[key] = {});

    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        if (isObject(value[k])) {
          stack.push({
            parent: result,
            key: k,
            value: value[k]
          });
        } else {
          result[k] = value[k];
        }
      }
    }
  }
  return root;
}

const c3 = clone3(obj);
c3.a.b = 1;
console.log("c3: ");
console.log(obj);
console.log(c3);
