let Promise = require("./Promise");

/**
 * 传入 Promise 的执行器 立即执行
 * 并且接受俩个参数
 * resolve Promise 的成功回调
 * reject Promise 的失败回调
 * @param {function} resolve 接受一个值
 * @param {function} reject 接受一个reason 失败理由
 */
// let promise1 = new Promise2(function(resolve, reject) {
//   setTimeout(function() {
//     let num = Math.random();
//     if (num < 0.5) {
//       resolve(num);
//     } else {
//       reject("失败");
//     }
//   });
// });

let p1 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject(100);
  }, 1000);
});

let p2 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject(200);
  }, 2000);
});

let p3 = Promise.all([p1, p2]);
p3.then(
  function(value) {
    console.log(value);
  },
  function(reason) {
    console.log(reason);
  }
);

p1.then(function() {}, function() {}).then(function() {}, function() {});
