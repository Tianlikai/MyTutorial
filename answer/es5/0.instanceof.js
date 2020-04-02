/**
 * 判断一个实例对象是否具有某个类的原型
 */
function instanceOf(instance, Constructor) {
  // 为基础数据类型，直接返回false
  if (typeof instance !== "object" || instance === null) return false;
  let proto = Object.getPrototypeOf(instance);
  while (true) {
    if (proto === null) return false;
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

module.exports = { instanceOf };

function Person() {}

const p1 = new Person();
console.log("myInstanceof: ");
console.log(instanceOf(p1, Person));
