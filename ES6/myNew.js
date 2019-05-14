/**
 * 模拟new关键字
 * 创建一个新对象
 * 将新对象的__proto__指向构造函数的prototype
 * 执行构造函数，如果构造函数的返回值为object，则返回返回值，反之返回新的对象
 */
function myNew() {
  var obj = new Object();
  var Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var res = Constructor.apply(obj, arguments);
  return typeof res === "object" ? res : obj;
}

function myNew2() {
  let obj = {};
  const Com = [...arguments].shift();
  obj.__proto__ = Com.prototype;
  const result = Com.call(obj, arguments);
  return typeof result === "object" ? result : obj;
}
