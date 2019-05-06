## javaScript 基础数据类型

- undefined
- null
- bool
- string
- number
- object
- symbol

## symbol 的实际运用

- 防止属性名冲突

## 理解值类型和引用类型

javaScript 中区分普通值类型和应用类型。

值类型

- 值类型直接存储在栈中，访问时直接从栈中取出
- 赋值操作时，是直接覆盖和拷贝

引用类型

- 数据的引用指针存放在栈中，具体数据存放在堆内存中
- 赋值时复制的是数据的指针引用

## null 和 undefined 的区别

- null 可以理解为一个空对象， undefined 理解为一个值未定义
- typeof null 为 'object'，typeof undefined 为 'undefined'
- null 为原型链的终点，当访问一个未赋值的变量时返回 undefined

## 隐式类型转换可能发生的场景

- 运算情况
- if while
- ===
- for in

## 类型判断

判断方式

- typeof 将 null 识别为 object，复杂数据类型统一识别为 object
- instanceOf 类型不准确，会在原型链上去查找
- Object.prototype.toString.call()可以准确识别内置数据类型，对自定义内无法识别

一个比好判断方式

```
const typeFactory = () => {
  const class2type = {};
  "Array Date RegExp Object Error"
    .split(" ")
    .forEach(e => (class2type[`[object ${e}]`] = e.toLowerCase()));

  return function type(target) {
    if (target === null) return String(target);
    const t = typeof target;
    return t !== "object"
      ? t
      : class2type[Object.prototype.toString.call(target)] || "object";
  };
};
```

## js 小数为什么会失精度

比较困难，[请参阅](https://github.com/camsong/blog/issues/9)

## js 实现继承的几种方式以及他们的优缺点

## 列举几个模块化方案

## JavaScript 如何实现异步编程，可以详细描述 EventLoop 机制

## 如何在保证页面运行流畅的情况下处理海量数据

## JavaScript 异常处理的方式，统一的异常处理方案
