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
