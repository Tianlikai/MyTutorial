Array.prototype.map2 = function(fn, context) {
  if (this === null || this === undefined) {
    throw new Error("Cannot read property map on null or undefined");
  }
  if (typeof fn !== "function") {
    throw new Error(fn + "is not a function");
  }
  const result = [];
  const array = Array.prototype.slice.call(this, 0);
  for (let i = 0; i < array.length; i += 1) {
    result.push(fn.call(context, array[i], i, this));
  }
  return result;
};
