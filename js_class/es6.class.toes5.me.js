var createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; ++i) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperties(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return defineProperties;
  };
})();

var Parent = (function() {
  function Parent(name) {
    this.name = name;
  }
  createClass(Parent, {}); // 传入属性
  return Parent;
})();
