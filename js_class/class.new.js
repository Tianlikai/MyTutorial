/**
 * js new 运算符
 */
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function self_new(sup) {
  return function() {
    // var o = Object.create(sup.prototype);
    var obj = {
      __proto__: sup.prototype
    };
    sup.apply(obj, arguments);
    return obj;
  };
}

var instance = self_new(Parent)("jason");
instance.getName();
