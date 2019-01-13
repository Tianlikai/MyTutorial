const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise2(executor) {
  const self = this;
  self.status = PENDING;

  // 缓存 fulfilled 回调
  self.onResolveCallbacks = [];

  // 缓存 rejected 回调
  self.onRejectCallbacks = [];

  /**
   * 执行器 中调用的 resolve方法
   * @param {*} value 成功值
   */
  function resolve(value) {
    if (value instanceof Promise2) {
      return value.then(resolve, reject);
    }

    setTimeout(function() {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolveCallbacks.forEach(cb => {
          cb(self.value);
        });
      }
    });
  }

  /**
   * 执行器 中调用的 reject方法
   * @param {*} reason 失败的理由
   */
  function reject(reason) {
    setTimeout(function() {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.value = reason;
        self.onRejectCallbacks.forEach(cb => {
          cb(self.value);
        });
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) return reject(new TypeError("循环引用"));

  let called = false;

  if (x instanceof Promise2) {
    // 如果 x 是一个 promise
    if (x.status === PENDING) {
      // x 处于 pending 状态
      // 等待 x 完成
      x.then(function(y) {
        // y 可能是一个promise
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else {
      // x 成功或者失败，用x的返回值 resolve 或 reject promise2
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // x 是一个 thenable
    // x 具有 then属性
    // then 中的成功或则失败回调 只能调用一次
    try {
      // promise 之间的交互
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function(y) {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          function(error) {
            if (called) return;
            called = true;
            reject(error);
          }
        );
      } else {
        // x 不是一个 thenable 对象
        // then 不是一个对象
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // x 是一个普通值
    // 用 x 的值去resolve promise2
    resolve(x);
  }
}

/**
 *
 * @param {*} onFulfilled
 * @param {*} onRejected
 * @return {Promise2} then 方法必须返回一个promise，实现链式调用
 */
Promise2.prototype.then = function(onFulfilled, onRejected) {
  // onFulfilled 不是函数，则输入什么，返回什么
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;

  // onRejected 不是函数，则抛出输入
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };

  let self = this;
  let promise2;

  if (self.status === FULFILLED) {
    // 成功时返回一个新的promise
    return (promise2 = new Promise2(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onFulfilled(self.value);
          if (x instanceof Promise2) {
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          // 执行 onFulfilled 出错，reject promise2
          reject(error);
        }
      });
    }));
  }

  if (self.status === REJECTED) {
    return (promise2 = new Promise2(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (self.status === PENDING) {
    return (promise2 = new Promise2(function(resolve, reject) {
      self.onResolveCallbacks.push(function() {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });

      self.onRejectCallbacks.push(function() {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }
};

Promise2.prototype.catch = function(onRejected) {
  this.then(null, onRejected);
};

Promise2.deferred = Promise2.defer = function() {
  let defer = {}; // 延迟对象
  defer.promise = new Promise2(function(resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

module.exports = Promise2;
