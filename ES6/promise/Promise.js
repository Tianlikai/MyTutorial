const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 实现 promisesaplus.com 规范
 * promise 状态只能为 pending fulfilled rejected
 * promise 状态一旦修改就不能再改变
 * @param {*} executor 执行器
 */
function MyPromise(executor) {
  const self = this;
  self.status = PENDING; // 设置状态

  // success 回调数组
  self.onResolvedCallbacks = [];

  // fail 回调数组
  self.onRejectCallbacks = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value; // 该值不能修改
      // 调用所有回调
      self.onResolvedCallbacks.forEach(cb => cb(self.value));
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.value = reason; // 该值不能修改
      // 调用所有回调
      self.onRejectCallbacks.forEach(cb => cb(self.value));
    }
  }

  try {
    /**
     * 传入的执行器可能回执行失败
     * 捕获直接reject
     */
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return new TypeError("循环引用");
  }

  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      // 等待的话，值继续往下传递
      x.then(function(y) {
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === "function" || typeof x === "object")) {
    // x 是一个 thenable
    try {
      let then = x.then;
      if (typeof then === "function") {
        // promise 相互之间的交互
        // 自己写的promise 和 别人写的promise
        // 考虑兼容性
        then.call(
          this,
          function(y) {
            resolvePromise(promise2, y, resolve, reject);
          },
          function(error) {
            reject(error);
          }
        );
      } else {
        // x 不是一个 thenable 对象 resolve promise2
        // 当作值resolve
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }
  } else {
    // x 是一个普通值，则用 x 的值 resolve promise2
    resolve(x);
  }
}

/**
 * 接受成功的值，或者失败的原因
 * @param {*} onFulfilled
 * @param {*} onRejected
 */
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };

  let self = this;
  let promise2;

  // success
  if (self.status === FULFILLED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      try {
        let x = onFulfilled(self.value);
        // 走promise 解析过程
        resolvePromise(promise2, x, resolve, reject);
      } catch (error) {
        reject(error);
      }
    }));
  }

  // failed
  if (self.status === REJECTED) {
    console.log("REJECTED", self.value);
    try {
      let x = onRejected(self.value);
      resolvePromise(promise2, x, resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * 还处于 pending 状态
   * 把将来要执行的 success 或者 fail 函数
   * 注册到 MyPromise 的 onResolvedCallbacks 和 onRejectCallbacks 数组中
   */
  if (self.status === PENDING) {
    self.onResolvedCallbacks.push(function() {
      let x = onFulfilled(self.value);
      resolvePromise(promise2, x, resolve, reject);
    });

    self.onRejectCallbacks.push(function() {
      let x = onRejected(self.value);
      resolvePromise(promise2, x, resolve, reject);
    });
  }
};

module.exports = MyPromise;
