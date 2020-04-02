Array.prototype.reduce1 = function(fn, initVal) {
  if (this === null || this === undefined) {
    throw new Error("Cannot read property map on null or undefined");
  }
  if (typeof fn !== "function") {
    throw new Error(fn + "is not a function");
  }
  const array = Array.prototype.slice.call(this);
  let [res, start] = initVal ? [initVal, 0] : [array[0], 1];
  for (; start < array.length; start += 1) {
    res = fn.call(null, res, array[start], start, this);
  }
  return res;
};
