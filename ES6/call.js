/**
 * 源生call函数
 */
Function.prototype.myCall = function(context) {
  if (!context) {
    context = typeof window === "undefined" ? global : window;
  }
  context.fn = this;
  const rest = [...arguments].slice(1);
  const result = context.fn(...rest);
  delete context.fn;
  return result;
};

// 实现方式
// a = {value : 1}
// 为a添加一个函数 fn 此时fn的上下文为a
// 试用完毕fn函数后，删除即可

function foo(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  };
}

var a = {
  value: 1
};

var result = foo.myCall(a, "jason", "22");
console.log(result);
