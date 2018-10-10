// 面向对象抽象组件写法

// es6 类方法都定义在 prototype 上
class Event {
  notice() {
    console.log("notice");
  }
}

// 由于es6 类方法都定义在 prototype 上
// 所以 Object.assign 可以为类一次性添加多个方法
Object.assign(Event.prototype, {});

// es6 类内部定义的所有方法都不可枚举
// ⚠️ es5 中 prototype 上定义的方法可枚举
console.log(Object.keys(Event.prototype));

// es6 类实例化事，直接调用会报错
// var e = Event();

console.log(typeof Event);
console.log(Event.prototype.constructor);
