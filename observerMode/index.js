// John Resig 的 class 实现
(function() {
  var initializing = false;
  var fnTest = /xyz/.test(function() {
    xyz;
  })
    ? /\b_super\b/
    : /.*/;

  // 超级父类
  this.Class = function() {};

  // 生成一个类，这个类会具有extend方法用于继续继承下去
  Class.extend = function(prop) {
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
    function Class() {
      if (!initializing && this.init) this.init.apply(this, arguments);
    }

    // 赋值原型链，完成继承
    Class.prototype = prototype;

    // 改变constructor引用
    Class.prototype.constructor = Class;

    // 为子类也添加extend方法
    Class.extend = arguments.callee;

    return Class;
  };
})();

/**
 * 观察者模式
 * 事件机制
 * 举例：如果 ComponentBase 是一个机器人，他会一直监听输入的字数并且汇报出去（通知）。而你可以把耳朵凑上去，听着他的汇报（监听）。
 *      当发现满足某些条件时便会进行某些行动
 * 要点：1 通知（notice），2 监听（on）
 */

var Event = Class.extend({
  // 绑定事件
  on: function(key, listener) {
    // 问题
    // listener 是一个匿名函数，也可以为具名函数
    // 如何区分重复添加的 listener
    if (!this.__events) {
      this.__events = {};
    }
    if (!this.__events[key]) {
      this.__events[key] = [];
    }
    if (
      this.__events[key].indexOf(listener) < 0 &&
      typeof listener === "function"
    ) {
      this.__events[key].push(listener);
    }
    return this;
  },

  // 触发一个事件
  notice: function(key) {
    if (!this.__events || !this.__events[key]) return null;
    var args = Array.prototype.slice.call(arguments, 1) || [];

    var listeners = this.__events[key];
    var i = 0;
    var l = listeners.length;

    for (; i < l; ++i) {
      listeners[i].apply(this, args);
    }
    return this;
  },

  // 注销事件
  off: function(key, listener) {
    if (!key && !listener) {
      this.__events = {};
    }
    if (key && !listener) {
      delete this.__events[key];
    }
    if (key && listener) {
      var listeners = this.__events[key];
      var index = listeners.indexOf[listener];
      listeners.splice(index, 1);
    }
    return this;
  }
});

// 组件基类
var ComponentBase = Event.extend({
  init: function(config) {
    this.__config = config;
    this.bind();
    this.render();
  },
  set: function(key, value) {
    this.__config[key] = value;
  },
  get: function(key) {
    return this.__config[key];
  },
  destroy: function() {
    this.off();
  }
});
