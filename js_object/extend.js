/**
 * 复制属性
 * 复制属性的内部特性
 * 复制其内部的权限
 */
Object.defineProperty(Object.prototype, "extend", {
  writable: true, // 可写
  enumerable: false, // 不可枚举
  configurable: true, // 可配置
  value: function(o) {
    var names = Object.getOwnPropertyNames(o);
    for (var i = 0; i < names.length; ++i) {
      if (names[i] in this) continue; // 如果有跳过
      var desc = Object.getOwnPropertyDescriptor(o, names[i]);
      Object.defineProperty(this, names[i], desc);
    }
  }
});

let a = {
  name: "jason",
  age: 24
};

Object.defineProperty(a, "weight", {
  value: "66kg",
  enumerable: false
});

console.log(Object.getOwnPropertyNames(a)); // 获取所有的属性
console.log(Object.keys(a)); // 获取所有的可枚举的属性
