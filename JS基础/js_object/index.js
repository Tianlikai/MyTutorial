/**
 * table of content
 * 属性的无序集合，每个属性都是一个键值对
 * 又名：hash散列，hashTable三列表，字典，关联数组
 *
 * 对象常见方法
 * 创建
 * 设置
 * 查找
 * 删除
 * 检查
 * 枚举
 * getter
 * setter
 *
 * 对象属性特性
 * 可写
 * 可枚举
 * 可配置
 *
 * 属性描述符
 * Object.getOwnPropertyDescriptor()
 * value
 * writable
 * enumerable
 * configurable
 *
 * 对象的拓展
 * 对象的原型
 *
 * 三大js对象
 * 1 js内置对象 数组/日期/Math/正则等等
 * 2 宿主对象
 * 3 自定义对象
 * 4 自定义属性
 * 5 继承属性
 *
 * 对象的三个属性
 * 每个对象都有原型
 * 类
 * 拓展性
 *
 *
 * 对象的序列化
 * 对象和字符串之间的相互转换
 */

/**
 * 创建对象
 * 1 对象字面量
 * 2 new 关键字
 * 3 Object.create()
 */

let obj1 = {
  name: "jason",
  age: 24
};

let obj2 = new Object();

let obj3 = Object.create(null);

/**
 * 删除属性
 * delete
 * 1 方法只会删除应用而不会修改值
 * 2 方法只能删除自有属性，不能删除继承的属性
 */
delete obj1.name;

/**
 * 检测属性
 * in
 * hasOwnProperty
 * propertyIsEnumerable
 */

let o = {
  name: "jason"
};

console.log("name" in o);
console.log("a" in o);
// in 运算会检测原型链上的属性
console.log("toString" in o);

console.log(o.hasOwnProperty("name"));
// hasOwnProperty 方法不会检测原型链上的属性
console.log(o.hasOwnProperty("toString"));

// propertyIsEnumerable 是hasOwnProperty的增强版
// propertyIsEnumerable 要求
// 1 属性是自有属性
// 2 自由属性是可枚举的

/**
 * for in 循环需要注意的点
 * 过滤 function
 * 过滤 继承而来的属性
 * for in 的各种应用
 * 可以实现集合的多种操作
 * 交集
 * 并集
 * 差集等等
 * 去重
 */

/**
 * 属性值可以由两个方法代替
 * getter
 * setter
 * getter 和 setter 属性是可以被继承的
 */
const inherit = require("./inherit");

var circle = {
  x: 1.0,
  y: 1.0,
  get r() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  set r(newValue) {
    var oldValue = Math.sqrt(this.x * this.x + this.y * this.y);
    var ratio = newValue / oldValue;
    this.x = this.x * ratio;
    this.y = this.y * ratio;
  }
};
console.log(circle.r);
circle.r = 100;
console.log(circle.x);

/**
 * 获得自有的属性描述符
 * Object.getOwnPropertyDescriptor()
 * 获取继承的属性描述符
 * Object.getPrototypeOf()
 * 获取属性的描述符
 * 可写
 * 可枚举
 * 可配置
 */

let oo = {
  x: "jason"
};
let des = Object.getOwnPropertyDescriptor(oo, "x");
console.log(des);

let des2 = Object.getPrototypeOf(oo);
console.log(des2);

/**
 * Object.defineProperty()
 * 对属性进行配置
 * 接受三个参数
 * 1 指定对象
 * 2 指定对象的属性
 * 3 初始化属性的配置
 */
var ooo = {};
Object.defineProperty(ooo, "name", { value: "jason", writable: false });
console.log(ooo.name);
ooo.name = "tom";
console.log(ooo.name);

/**
 * 原型属性
 *
 * 判断一个对象是否是另一个对象的原型
 * Object.isPrototypeOf()
 */

var j = {};
var k = {};
var jj = Object.create(j);
console.log(j.isPrototypeOf(k));

/**
 * 类属性方法
 * 查看./classOf.js
 */

/**
 * 对象的可拓展性
 * Object.esExtensible() 判断对象是否可拓展
 * Object.seal 将对象锁定
 * Object.freeze() 将对象冻结
 */
