/**
 * 浅拷贝
 */

const object = {
  aa: 1,
  bb: 2,
  cc: 3,
  dd: {
    ee: 5
  },
  ff: {
    gg: 6
  }
};

/**
 * 1 Object.assign();
 */
const c1 = Object.assign(object);

/**
 * es6 解构
 */
const c2 = { ...object };

/**
 * 一层循环
 */
function shallowCopy(target) {
  const result = {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) result[key] = target[key];
  }
  return result;
}
