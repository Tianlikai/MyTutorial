/**
 * 在javascript中，每一个函数都有prototype属性。
 * 而且每一个new出来的实例对象都有__proto__ 属性指向 prototype。
 *
 * 说白了所有的实例对象都会共用一个prototype对象
 * 并且调用一个属性或者方法时在自己上面找不到，就会找__proto__对象有没有，之后一直往上追溯一直到找到为止。
 */

function Animal(name) {
  this.name = name;
}

Animal.prototype.run = function() {
  console.log(this.name + " is running!");
};

var cat = new Animal("cat");
var dog = new Animal("dog");

console.log(Animal.prototype); // Animal { run: [Function] }
console.log(Animal.prototype instanceof Object); // true
console.log(Animal.prototype.constructor === Animal); // true
console.log(cat.__proto__ === Animal.prototype); // true
console.log(cat.__proto__.__proto__); // {} 最后会找到最上面的boject对象

// 所以，在prototype对象上定义的方法会被所有实例共享，这不就是复用吗？

/**
 * 基于原型（prototype）的继承
 * 原始时代继承
 */

function Dog(name) {
  // 借用构造函数
  Animal.call(this, name);
}

Dog.prototype = new Animal();
var dog_tom = new Dog("dog_tom");
dog_tom.run();

console.log(Dog.prototype.constructor);
console.log(dog_tom.__proto__);
/**
 * 注意
 * 1: 屏蔽效果 - 需要注意的是，如果在子类的 prototype 对象上也有 run 方法，就会覆盖父类的，因为查找时在自己上面就找到了，就不会向上回溯了。
 * 2: constructor指向问题 - Dog原型 constructor 问题
 * 3: 原型上生成多余属性 - 执行new Animal()就会执行animal的构造函数
 *    就会在Dog.prototype生成多余的属性值，这边是name。
 *    而一般属性值为了复用是不能放在原型对象上的。并且由于 dog 有自己的 name 属性，原型上的是多余的.
 */
