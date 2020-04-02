function type(obj) {
  if (obj === null) return String(obj);
  return typeof obj === "object"
    ? Object.prototype.toString
        .call(obj)
        .slice(8, -1)
        .toLowerCase()
    : typeof obj;
}

const isType = type => obj =>
  Object.prototype.toString.call(obj) === `[object ${type}]`;

module.exports = { type, isType };
