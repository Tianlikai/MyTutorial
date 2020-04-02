Function.prototype.call1 = function(context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

var a = { value: 1 };
var value = 3;

function foo(b) {
  console.log(this.value);
  return b;
}

const res = foo.call1(null, 2);
console.log(res);
