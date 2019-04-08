/**
 * bind函数
 * 实现方式
 * 利用柯里化 返回一个函数
 * 并且实现分次给参数以及new 构造函数时不丢失上下问
 */
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") throw Error("context expected a function");
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function() {};
  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments);
    const scope = this instanceof self ? this : context;
    self.apply(scope, args.concat(bindArgs));
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

function foo() {
  console.log(this.value);
}

var a = {
  value: 1
};

var bind = foo.myBind(a);
bind();
bind();
bind();
bind();
