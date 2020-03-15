function type(target) {
  if (target === null) return String(target);
  return typeof target === "object"
    ? Object.prototype.toString.call(target).slice(8, -1)
    : typeof target;
}

module.exports = type;
