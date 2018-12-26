"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

/**
 * 调用父类的 Constructor 构造函数
 */
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

/**
 * 继承
 * @param {*} subClass 子类
 * @param {*} superClass 父类
 */
function _inherits(subClass, superClass) {
  // 类型检测
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }

  /**
   * Object.create 接受两个参数
   * 指定原型创建对象
   * @param {*} 目标原型
   * @param {*} 添加属性
   */
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass, // subClass.prototype.constructor 指向 subClass
      enumerable: false, // constructor 不可枚举
      writable: true,
      configurable: true
    }
  });

  /**
   * Object.setPrototypeOf 方法
   * 设置子类的 __proto__ 属性指向父类
   * @param {*} 子类
   * @param {*} 父类
   */
  if (superClass) {
    // 设置子类的__proto__ 让 Child 能访问父类静态属性
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
  }
}

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

var Parent = (function() {
  function Parent(name) {
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

/**
 * @param {*} _Parent 传入父类
 */
var Child = (function(_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    _classCallCheck(this, Child);

    /**
     * 调用父类的 Constructor 构造函数
     */
    var _this = _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name) // 调用父类Constructor
    );

    _this.age = age;
    return _this;
  }

  _createClass(Child, [
    {
      key: "sayHello",
      value: function sayHello() {
        console.log("hello my age is " + this.age);
      }
    }
  ]);

  return Child;
})(Parent);

var instance = new Child("jason");

console.log("\n");
console.log(instance.__proto__);
console.log(Child.prototype);

console.log(Child.prototype.constructor);
console.log(Child.__proto__);
