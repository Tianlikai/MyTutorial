/**
 * 组合继承
 * 优点：
 * 1 融合了原型链机继承的优点和借用构造函数继承的优点
 * 缺点：
 * 1 需要重新改写子类原型链的Constructor属性
 * 2 组合继承会两次调用父类的构造函数，所以在child实例中和Child原型上会有一份冗余的数据
 * @param {*} name
 */
function Parent(name) {
  this.name = name;
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = new Parent();
Child.prototype.Constructor = Child;
