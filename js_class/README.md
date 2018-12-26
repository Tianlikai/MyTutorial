# ES6 中 class 和 extends 实现原理

在学习中，我们通常会遇到这种场景，在阅读某段实现源码时我们往往能看懂大部分代码，但是却卡在其中的一两个点，导致无法继续阅读。
所以在这里我会先列出 class 和 extends 需要的预备知识。

## 属性描述符

`Object.getOwnPropertyDescriptor()` 方法获取元素的属性描述，

```
/**
 * 知识点：属性描述符
 * 从 ES5 开始，所有的属性都具备了属性描述符
 *
 */
var obj = {
  name: "jason"
};

/**
 * getOwnPropertyDescriptor
 * 获取属性描述符
 */
var des = Object.getOwnPropertyDescriptor(obj, "name");
console.log(des);

/**
 * {
 *  value: 'jason',
 *  writable: true, // 可写
 *  enumerable: true, // 可枚举
 *  configurable: true // 可配置
 * }
 */

```

`Object.defineProperty()` 定义对象上属性的一些特性

```

/**
 * Object.defineProperty
 * 该方法定义对象上属性的一些特性
 *
 * 第一个参数，目标对象
 * 第二个参数，要添加或编辑的属性
 * 第三个参数，描述
 */
var obj2 = {};
Object.defineProperty(obj2, "age", {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true
});
console.log(obj2.age); // 2


```

`writable：`对象上的属性是否可以修改。兼容模式下编辑不可写元素会编辑失败，严格模式下会报错。

```
var obj3 = {};
Object.defineProperty(obj3, "age", {
  value: 2,
  writable: false,
  configurable: true,
  enumerable: true
});
obj3.age = 23;
console.log(obj3.age); // 2 不可修改

```

`configurable：`对象上的属性是否可以配置

```
var obj4 = {};
Object.defineProperty(obj4, "age", {
  value: 22,
  writable: true,
  configurable: false, // 不可配置
  enumerable: true
});

/**
 * 再次定义
 * 此时会报错
 */
// Object.defineProperty(obj4, "age", {
//   value: 22,
//   writable: true,
//   configurable: false,
//   enumerable: true
// });

delete obj4.age;
console.log(obj4.age); // 22 属性删除失败，应为属性不可配置

```

`enumerable：` 当 enumerable 为 false 之后，for...in 不会遍历到该对象

```

/**
 * enumerable
 * 当 enumerable 为 false 之后，for...in 不会遍历到该对象
 */
var obj5 = {
  weight: "66kg"
};
Object.defineProperty(obj5, "height", {
  value: "176cm",
  writable: true,
  configurable: true,
  enumerable: false // 不可枚举
});
let keys = Object.keys(obj5);
console.log(keys); // [ 'weight' ] 属性 height 不可遍历

```

## prototype，constructor，\_\_proto\_\_ 三者之间的关系

![](./prototype5.png)

## es6 中类的实现 和 es5 比较

`es6 中类的实现`

```

class Parent {
  constructor(name) {
    this.name = name;
  }

  /**
   * 静态方法，通过 Parent 调用
   */
  static getMe() {
    console.log("this is super");
  }

  /**
   * 公共方法，在 prototype 上
   */
  getName() {
    console.log(this.name);
  }
}

```

`es5` 实现方式

```

/**
 * 立即执行闭包
 * @param {*} Constructor 构造函数
 * @param {*} protoProps 原型属性
 * @param {*} staticProps 静态属性
 * @return {function}
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
    // 原型上属性, 添加到Constructor 的原型上
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    // 类上的属性, 添加到Constructor 类上
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
 * 立即执行闭包
 * @return {function}
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

```

## es6 中继承的实现 和 es5 比较

`es6` 中继承的实现

```

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  sayHello() {
    console.log(`hello my age is ${this.age}`);
  }
}


```

`es5` 继承关键字实现

```

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

```

`es5` 中继承的实现

```

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


```

## 完结

以上就是 es6 class 和 extends 的 es5 实现方式，以上代码有一些隐藏细节还需要自学，以下是用到的知识点

- 属性描述符
- Object.create 引用原型链需要指定 Constructor 属性
- new 关键字的实现方式 其中需要设置 \_\_proto\_\_ 属性
- Object.setPrototypeOf 实现原理 让子类的\_\_proto\_\_ = 父类
- instanceof 判断 子类的\_\_proto\_\_ === 父类
- 调用子类的 Constructor 也会调用父类的 Constructor
- 设置子类的 \_\_proto\_\_ = 父类，让子类可以调用父类静态方法
