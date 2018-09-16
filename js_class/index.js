/**
 * 类的定义
 * 类和原型
 * 类和构造函数
 * constructor属性
 */

/**
 * 工厂模式创建实例
 */
function createPerson(name) {
  var o = new Object();
  o.name = name;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}

var jason = createPerson("jason");

jason.sayName();
console.log(jason.constructor);

/**
 * 构造函数
 * @param {*} name
 */
function Person(name) {
  this.name = name;
  this.sayName = sayName;
}

function sayName() {
  console.log(this.name);
}

const jack = new Person("jack");
jack.sayName();
console.log(jack.constructor);
console.log(Person.prototype.constructor);

/**
 * 组合模式
 * @param {*} name
 */
function Man(name) {
  this.name = name;
}
Man.prototype.sayName = function() {
  console.log(this.name);
};

var bob = new Man("bob");
bob.sayName();
console.log(bob.constructor);
console.log(Man.prototype.constructor);
