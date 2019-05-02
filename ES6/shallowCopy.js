/**
 * 浅拷贝
 * 1 Object.assign()
 * 2 es6 结构
 * 3 一层循环
 */

function shallowCopy(source) {
  let result = {};
  Object.keys(source).forEach(key => result[key] = source[key])
  return result;
}

const object = {
  aa: 1,
  bb: 2,
  cc: 3,
  dd: {
    ee: 5,
  },
  ff: {
    gg: 6,
  }
};

const newObj1 = shallowCopy(object)
const newObj2 = Object.assign(object)
const newObj3 = {...object}

object.dd.ee = 2
newObj3.ff.gg = 5
console.log(object)
console.log(newObj1)
console.log(newObj2)
console.log(newObj3)

