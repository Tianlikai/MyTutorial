/**
 * bind() 方法会创建一个新函数。
 * 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this
 * 之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
 */
Function.prototype.myBind = function(context, ...rest) {
  const self = this;
  return function F() {
    if (this instanceof F) {
      return new self(...rest, ...arguments);
    } else {
      self.call(context, ...rest);
    }
  };
};

var a = {
  value: 1
};

function b(name, age) {
  console.log(this);
  console.log(`name is ${name}`);
  console.log(`age is ${age}`);
  return {
    value: this.value,
    age,
    name
  };
}

const func = b.bind(a, "Tinalikai", 25);
func();
console.log("new 实例: ");
const ins = new func();
