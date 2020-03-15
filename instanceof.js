/***
 * instanceof 运算符可以用来判断某个构造函数的prototype属性是否存在于另外一个要检测对象的原型链上
 */
const myInstanceof1 = (instance, Constructor) => {
  if (!instance || typeof instance === "symbol") return false;
  const prototype = Constructor.prototype;
  let proto = instance.__proto__;
  while (true) {
    if (proto === prototype) return true;
    if (proto === null) return false;
    proto = proto.__proto__;
  }
};

function Person() {}

const p1 = new Person();
console.log(p1 instanceof Person);
console.log(Symbol() instanceof Object);
console.log("myInstanceof: ");
console.log(myInstanceof1(p1, Person));
console.log(myInstanceof1(Symbol(), Object));
