const typeFactory = () => {
  const class2type = {};
  "Array Date RegExp Object Error"
    .split(" ")
    .forEach(e => (class2type[`[object ${e}]`] = e.toLowerCase()));

  return function type(obj) {
    if (obj === null) return String(obj);
    return typeof obj === "object"
      ? class2type[Object.prototype.toString.call(obj)] || "object"
      : typeof obj;
  };
};

const type = typeFactory();

module.exports = type;
