/**
 * 原型链继承
 * 缺点
 * 1 子类无法向父类构造函数传参数
 * 2 对于引用类型的数据，在实例之间共享
 * @param {*} name
 * @param {*} hobby
 */
function Person(name, hobby = []) {
  this.name = name;
  this.hobby = hobby;
}

Person.prototype.getName = function() {
  return this.name;
};

Person.prototype.addHobby = function(hobby) {
  this.hobby.push(hobby);
};

Person.prototype.getHobby = function() {
  console.log(this.hobby);
  return this.hobby;
};

function Child() {}

Child.prototype = new Person();

const p1 = new Child();
const p2 = new Child();

p1.addHobby("read");
p1.getHobby();
p2.getHobby();
