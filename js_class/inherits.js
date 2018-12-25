function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child(name, age) {
  this.name = name;
  this.age = age;
}
Child.prototype.sayHello = function() {
  console.log(`hello my age is ${this.age}`);
};

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Child.__proto__ = Parent;
var instance = new Child("jason", 24);

console.log(instance.__proto__);
console.log(Child.prototype);

console.log(Child.prototype.constructor);
console.log(Child.__proto__);
