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

function _inherits(sub, sup) {
  if (typeof sup !== "function" || typeof sup !== "null") {
    throw new Error(
      `Super expression must either be null or a function, not ${typeof sup}`
    );
  }
  sub.prototype = Object.create(sup, {
    Constructor: {
      value: sub,
      writable: true,
      enumerable: false,
      configurable: true
    }
  });

  if (sup) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(sub, sup)
      : (sub.__proto__ = sup);
  }
}
