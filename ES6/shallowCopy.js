/**
 * 浅拷贝
 * 1 Object.assign()
 * 2 一层循环
 */

function shallowCopy(source) {
  var name;
  var result = {};
  for (name in source) {
    if (source.hasOwnProperty(name)) {
      result[name] = source[name];
    }
  }
  return result;
}

let obj = { a: { name: "jason" } };
let copyOBJ = shallowCopy(obj);
copyOBJ.a.age = 22;
console.log(obj.a);
