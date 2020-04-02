/**
 * 借用构造函数
 * 优点
 * 1 子类可以向父类传递参数
 * 2 实例之间不再共享引用类型数据
 * 缺点
 * 1 方法都在构造函数中定义，每次创建实例都会从新创建方法
 */
function Parent(name) {
  this.name = name;
  this.hobbys = [];
}

function Child(name) {
  Parent.call(this, name);
  this.getName = function() {
    console.log(this.name);
    return this.name;
  };
}

Child.prototype = new Parent();

const p1 = new Child("tom");
const p2 = new Child("bob");

p1.hobbys.push("sports");
console.log(p1.hobbys, p2.hobbys);

p1.getName();
p2.getName();
