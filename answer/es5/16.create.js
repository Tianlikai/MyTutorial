function create(prototype) {
  function F() {}
  F.prototype = prototype;
  F.prototype.constructor = F;
  return new F();
}
