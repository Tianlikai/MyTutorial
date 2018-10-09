/**
 * 完善继承
 * 1 修改constructor指向问题
 * 2 修改 原型上生成多余属性
 */

// 修改 原型上生成多余属性
function objCreate(prototype) {
  var F = function() {};
  F.prototype = prototype; // F 拥有 父类的原型，但是F的构造函数中没有多余操作
  return new F();
}

// 1 修改constructor指向问题
// 完成继承
function inherit(subClass, superClass) {
  subClass.prototype = objCreate(superClass.prototype);
  subClass.prototype.constructor = subClass;
}

function Animal(name) {
  this.name = name;
}

Animal.prototype.run = function() {
  console.log(this.name + " is running!");
};

function Dog(name) {
  // 借用构造函数
  Animal.call(this, name);
}

inherit(Dog, Animal);

var dog = new Dog("dog");
dog.run();

console.log(Dog.prototype.constructor); // [Function: Dog]
console.log(dog.__proto__); // Dog { constructor: [Function: Dog] }
console.log(Dog.prototype); // Dog { constructor: [Function: Dog] }
