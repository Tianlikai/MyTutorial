(function() {
  var initializing = false;
  var fnTest = /xyz/.test(function() {
    xyz;
  })
    ? /\b_super\b/
    : /.*/;

  // 超级父类
  this.Glass = function() {};

  // 生成一个类，这个类会具有extend方法用于继续继承下去
  Glass.extend = function(prop) {
    // this指向父类。初次时指向Class超级父类
    var _super = this.prototype;

    // 开关 用来使原型赋值时不调用真正的构成流程
    initializing = true;
    var prototype = new this();
    initializing = false;

    for (var name in prop) {
      // 这边其实就是很简单的将prop的属性混入到子类的原型上。如果是函数我们就要做一些特殊处理
      prototype[name] =
        typeof prop[name] == "function" &&
        typeof _super[name] == "function" &&
        fnTest.test(prop[name])
          ? (function(name, fn) {
              // 通过闭包，返回一个新的操作函数.在外面包一层，这样我们可以做些额外的处理
              return function() {
                var tmp = this._super;

                // 调用一个函数时，会给this注入一个_super方法用来调用父类的同名方法
                this._super = _super[name];

                // 因为上面的赋值，是的这边的fn里面可以通过_super调用到父类同名方法
                var ret = fn.apply(this, arguments);

                // 离开时 保存现场环境，恢复值。
                this._super = tmp;

                return ret;
              };
            })(name, prop[name])
          : prop[name];
    }

    // 这边是返回的类，其实就是我们返回的子类
    function Glass() {
      if (!initializing && this.init) this.init.apply(this, arguments);
    }

    // 赋值原型链，完成继承
    Glass.prototype = prototype;

    // 改变constructor引用
    Glass.prototype.constructor = Glass;

    // 为子类也添加extend方法
    Glass.extend = arguments.callee;

    return Glass;
  };
})();

var Person = Glass.extend({
  init: function(isDancing) {
    this.dancing = isDancing;
  },
  dance: function() {
    return this.dancing;
  }
});

var p = new Person(true);
var a = p.dance(); // => true
console.log(a);
