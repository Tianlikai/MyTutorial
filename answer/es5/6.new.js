function new1() {
  const ins = {};
  const Constructor = [].shift(arguments);
  ins.__proto__ = Constructor.prototype;
  const res = Constructor.apply(ins, arguments);
  return typeof res === "object" ? res : ins;
}
