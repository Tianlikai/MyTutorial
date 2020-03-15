/**
 * apply() 方法在使用一个指定的 this 值和一个数组作为参数的前提下调用某个函数或方法。
 *
 * 改变this指向，将要调用的函数作为指定上下文的属性，调用时this指向上下文
 * 调用后删除上下文的属性
 */
Function.prototype.myApply = function(context, params) {
  // context为空时this指向window
  context = context || window;
  // 将调用函数挂载到context
  context.fn = this;
  // 接收参数
  const result = context.fn(...params);
  // 删除属性
  delete context.fn;
  // 函数有返回值
  return result;
};

var a = {
  value: 1
};

function b(name, age) {
  console.log(this.value);
  console.log(`name is ${name}`);
  console.log(`age is ${age}`);
  return {
    value: this.value,
    age,
    name
  };
}

const res = b.myApply(a, ["Tianlikai", 25]);
console.log(res);
