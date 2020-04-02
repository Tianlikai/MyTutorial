function createPrototype(prototype) {
  function F() {}
  F.prototype = prototype;
  return new F();
}

function inheritance(Child, Parent) {
  const prototype = createImageBitmap(Parent.prototype);
  prototype.constructor = Child;
  Child.prototype = prototype;
}

function Parent(name) {
  this.name = name;
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

/**
 * 组合寄生式继承
 */
inheritance(Child, Parent);

function _inherits(subClass, superClass) {
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  // Object.setPrototypeOf继承静态方法
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}
