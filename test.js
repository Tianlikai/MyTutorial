var MyModules = (function manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; ++i) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }
  return {
    define,
    get
  };
})();

MyModules.define("bar", [], function() {
  function hi(who) {
    console.log(`hi: ${who}`);
  }

  return {
    hi
  };
});

MyModules.define("foo", ["bar"], function() {
  function goodbye(hi, goodbye) {
    bar.hi(hi);
    console.log(`goodbye: ${goodbye}`);
  }

  return {
    goodbye
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

foo.goodbye("tony", "tom");
