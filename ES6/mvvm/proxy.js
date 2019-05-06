(function() {
  var root = this;

  function watch(target, func) {
    var proxy = new Proxy(target, {
      get: function(target, prop) {
        return target[prop];
      },
      set: function(target, prop, value) {
        target[prop] = value;
        func(prop, value);
      }
    });

    return proxy;
  }

  this.watch = watch;
})();
