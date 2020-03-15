/**
 * 寄生组合模式
 */

/**
 * 该方法等同于Object.create()
 * 接入传入的原型链
 */
function createPrototype(prototype) {
  function F() {}
  F.prototype = prototype;
  return new F();
}

/**
 * 拿到父类的原型
 * 重置子类原型的constructor
 */
function prototype(child, parent) {
  const prototype = createPrototype(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

function Parent(name, hobby) {
  this.name = name;
  this.hobby = hobby;
}

function Child(name, hobby) {
  Parent.call(this, name, hobby);
}

/**
 * 继承操作
 * 子类prototype链接到父类prototype
 */
prototype(Child, Parent);
const v1 = new Child("jason", "sports");
console.log(v1);
console.log(Child.prototype);
