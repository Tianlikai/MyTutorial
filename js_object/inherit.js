/**
 * 简单实现继承关键字
 * js中不存在继承
 * js 中继承是都是原型链模拟得到的结果
 * @param {*} p
 */
function inherit(p) {
  if (p == null) {
    // p 为null 直接抛错
    throw TypeError();
  }
  if (Object.create) {
    // Object.create 直接有继承的作用
    return Object.create(p);
  }
  if (typeof p !== "object" || typeof p !== "function") {
    throw TypeError();
  }
  function F() {}
  // 让 F 的原型为传入的 p
  F.prototype = p;
  return new F();
}

function f() {
  console.log("a");
}
let a = {
  f: f
};
let res = inherit(a);
console.log(res.f);
