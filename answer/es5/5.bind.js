Function.prototype.bind2 = function(context, ...args) {
  const self = this;
  return function F() {
    if (this instanceof F) {
      return new F(...args, ...arguments);
    } else {
      return self.call(context, ...args);
    }
  };
};
