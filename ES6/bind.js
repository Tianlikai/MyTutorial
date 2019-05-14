/**
 * bind函数
 * 实现方式
 * 利用柯里化 返回一个函数
 * 并且实现分次给参数以及new 构造函数时不丢失上下问
 */
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") throw Error("context expected a function");
  const self = this;
  const args = [...arguments].slice(1);
  const fNOP = function() {};
  fNOP.prototype = this.prototype;

  const fBound = function() {
    const bindArgs = [...args, ...arguments];
    const scope = this instanceof self ? this : context;
    self.apply(scope, bindArgs);
  };

  fBound.prototype = new fNOP();
  return fBound;
};

function foo() {
  console.log(this.value);
}

var a = {
  value: 1
};
var bind = foo.bind1(a);
bind();
bind();
bind();
bind();
