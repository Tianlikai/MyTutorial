function Person() {}

const person = new Person();

/**
 * prototype 就是调用构造函数而创建的实例的原型
 */
Person.prototype.name = "person";

// 实例的__proto__ === 构造函数的prototype
console.log(
  "实例的__proto__ === 构造函数的prototype:",
  person.__proto__ === Person.prototype
);

// 原型的constructor指向构造函数
console.log(
  "原型的constructor指向构造函数:",
  Person.prototype.constructor === Person
);

// 获取对象的原型
console.log(
  "获取对象的原型Object.getPrototypeOf():",
  Object.getPrototypeOf(person) === Person.prototype
);

// prototype属性也具有__proto__属性
console.log("Person.prototype.__proto__ =", Person.prototype.__proto__);

// 通过__proto__属性实现原型链查找
// 实例的__proto__ -> prototype -> prototype.__proto__ -> prototype
