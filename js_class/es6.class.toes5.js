"use strict";

/**
 * 立即执行函数
 * 生成独立作用域
 */
var _createClass = (function() {
  /**
   * 为属性添加描述符
   * @param {object} target 目标对象
   * @param {Array} props 属性
   */
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  /**
   * @param {Object} Constructor
   * @param {array} protoProps 原型属性
   * @param {array} staticProps 静态属性
   */
  return function(Constructor, protoProps, staticProps) {
    // 原型上属性
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    // 类上的属性
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

/**
 * 检测函数
 * es6 中 类不能直接调用
 * @param {*} instance 实例
 * @param {*} Constructor 构造函数
 */
function _classCallCheck(instance, Constructor) {
  console.log(instance.__proto__);
  console.log(Constructor.prototype);

  // instance 是否是 Constructor 的实例
  console.log(instance.__proto__ === Constructor.prototype);

  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * 立即执行函数
 * 生成独立作用域
 */
var Parent = (function() {
  function Parent(name) {
    // 验证是否是实例化类
    // es6不允许类直接调用，直接调用抛出异常
    _classCallCheck(this, Parent);

    this.name = name;
  }

  _createClass(
    Parent,
    [
      {
        key: "getName",
        value: function getName() {
          console.log(this.name);
        }
      }
    ],
    [
      {
        key: "getMe",
        value: function getMe() {
          console.log("this is super");
        }
      }
    ]
  );

  return Parent;
})();

var instance = new Parent("jason");
