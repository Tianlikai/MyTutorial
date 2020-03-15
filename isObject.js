function isObject(target) {
  if (target === null) return false;
  return Object.prototype.toString.call(target) === "[object Object]";
}

module.exports = isObject;
