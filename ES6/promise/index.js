let Promise2 = require("./Promise2");

/**
 * 传入 Promise 的执行器 立即执行
 * 并且接受俩个参数
 * resolve Promise 的成功回调
 * reject Promise 的失败回调
 * @param {function} resolve 接受一个值
 * @param {function} reject 接受一个reason 失败理由
 */
let promise1 = new Promise2(function(resolve, reject) {
  setTimeout(function() {
    let num = Math.random();
    if (num < 0.5) {
      resolve(num);
    } else {
      reject("失败");
    }
  });
});

/**
 * promise1 Promise 具有原型上的 then 方法
 * 所以 promise1 是一个 thenable 对象
 * 第一个函数是成功回调
 * 第而个函数是失败回调
 */
let promise2 = promise1
  .then(
    function(resp) {
      // 成功回调
      // 这里也可以是一个 promise
      console.log(resp);
      throw new Error("成功回调出错啦");
    },
    function(reason) {
      console.log(reason);
    }
  )
  .then(
    function(resp) {
      console.log(resp);
    },
    function(error) {
      console.log(error);
    }
  );

let promise3 = p1.then(function(data) {
  console.log(data);
  // 等待promise3自己完成，永远不会完成
  // 将会一直等待
  return promise3;
});
