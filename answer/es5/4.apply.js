Function.prototype.apply2 = function(context, args) {
  context = context || window;
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
};
