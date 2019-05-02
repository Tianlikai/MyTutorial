function createPerson(name) {
  var o = new Object();
  o.name = name;
  o.getName = function() {
    console.log(this.name);
  };
  return o;
}

var person1 = createPerson("kevin");
person1.getName();

function Person(name) {
  this.name = name;
}

// 组合式继承问题，两次调用超类构造函数树
Person.prototype.getName = function() {
  return this.name;
};

function Parent(name) {
  this.name = name;
}

function Child(name, age) {
  Parent.call(this, name); // 第二次调用
  this.age = age;
}

Child.prototype = new Parent(); // 第一次调用
Child.prototype.constructor = Child;

// 优化组合式继承的问题
function create(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
