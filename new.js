function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  console.log(`hi im ${this.name}`);
};

/**
 * New 操作符返回一个对象
 * 对象的__proto__指向构造函数的prototype
 * 执行传入的构造函数，将this指向将要返回的对象
 * 构造函数的返回值类型为object时返回结果，否则返回实例
 */
function createInstance() {
  const ins = {};
  const Constructor = [].shift.call(arguments);
  ins.__proto__ = Constructor.prototype;
  const result = Constructor.apply(ins, arguments);
  return typeof result === "object" ? result : ins;
}
const p1 = createInstance(Person, "jason", 23);
console.log(p1.name);
console.log(p1.age);
p1.sayHi();
