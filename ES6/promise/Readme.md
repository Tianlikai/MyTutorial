# 实现 promises a+ 规范

## 前言

本文完全按照[promise a+ 规范](https://promisesaplus.com/)实现

通过 promises a+ [合规性测试](https://github.com/promises-aplus/promises-tests)

## 为什么要用 promise

- 实现控制反转，解决三方信任问题（例如回调模式中的，回调得不到执行，执行多次，不执行，执行过早，执行过完，吞掉三方异常）
- thenable 实现 promise 之间的交互
- 链式流处理

## 实现 Promise 类

以下是完整的 promise a+ 规范实现，代码上有具体的代码注释

```
/**
 * promise 必须处于以下三种状态之一
 * 并且一旦状态变更，则不能再变更
 */
const PENDING = "pending"; // 等待
const FULFILLED = "fulfilled"; // 完成
const REJECTED = "rejected"; // 拒绝

/**
 * Promise 类
 * @param {*} executor 执行器
 */
function MyPromise(executor) {
  const self = this;
  self.status = PENDING; // 初始状态

  // 成功回调缓存
  self.onResolveCallbacks = [];
  // 失败回调缓存
  self.onRejectCallbacks = [];

  /**
   * 执行所有成功回调
   * 更改 status 为 FULFILLED，并且不能再转变
   * @param {*} value
   */
  function resolve(value) {
    if (value instanceof MyPromise) {
      // 如果 value 是一个 promise 对象
      // 则等待 value 完成
      return value.then(resolve, reject);
    }

    setTimeout(function() {
      // 将 promise 放入事件循环
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolveCallbacks.forEach(function(cb) {
          cb(self.value);
        });
      }
    });
  }

  /**
   * 执行所有失败回调
   * 更改 status 为 REJECTED
   * @param {*} reason
   */
  function reject(reason) {
    setTimeout(function() {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.value = reason;
        self.onRejectCallbacks.forEach(function(cb) {
          cb(self.value);
        });
      }
    });
  }

  try {
    // 立即执行 执行器
    executor(resolve, reject);
  } catch (error) {
    // 执行器抛出异常，则直接reject
    reject(error);
  }
}

/**
 * then 方法
 * then 实现链式调用
 * then 实现值的穿透
 * @param {*} onFulfilled 成功回调
 * @param {*} onRejected 失败回调
 */
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // 如果传入的 onFulfilled 不是一个函数，或者为空
  // 当出现
  // p2 = p1.then('data')
  // p2.then(function(data){}, function(){})
  // 这种情况需要用 p1的 ‘data’ 传递到 p2成功回调的 data
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;

  // 如果传入的 onRejected 不是一个函数，或者为空
  // 当出现
  // p2 = p1.then('data')
  // p2.then(function(data){}, function(){})
  // 这种情况下 p1 的 onRejected为空 需要用 p2的 reason reject p1
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };

  let self = this;
  let promise2;

  if (self.status === FULFILLED) {
    // 当 promise 的状态为成功态
    // 为了实现 then 的链式调用
    // then 方法必须返回一个 新的 promise
    return (promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(function() {
        try {
          // 执行 then 传入的成功回调
          let x = onFulfilled(self.value);
          // promise2 依赖于x
          // 所以走 resolvePromise 解析过程
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          // onFulfilled 可能会抛出错误
          reject(error);
        }
      });
    }));
  }

  if (self.status === REJECTED) {
    // 当 promise 的状态为成功态
    // 为了实现 then 的链式调用
    // then 方法必须返回一个 新的 promise
    return (promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (self.status === PENDING) {
    // 当 promise 的状态为等待
    // 则将回到放入到缓存的 成功或者失败回调函数中
    return (promise2 = new MyPromise(function(resolve, reject) {
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

/**
 * 所有的 promise 完成，才resolve
 * 有一个 promise 失败，就reject
 * @param {*} promises
 */
MyPromise.all = function(promises) {
  return new MyPromise(function(resolve, reject) {
    const done = gen(promises.length, resolve);
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then(function(value) {
        done(i, value);
      }, reject);
    }
  });
};

/**
 * 第一个 promise 的状态改变，就返回结果
 * @param {*} promises
 */
MyPromise.race = function(promises) {
  return new MyPromise(function(resolve, reject) {
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then(resolve, reject);
    }
  });
};

MyPromise.prototype.catch = function(onRejected) {
  this.then(null, onRejected);
};

MyPromise.deferred = MyPromise.defer = function() {
  let defer = {}; // 延迟对象
  defer.promise = new MyPromise(function(resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

/**
 * resolvePromise 解析
 * @param {*} promise2
 * @param {*} x
 * @param {*} resolve
 * @param {*} reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 类似一下情况
  // let p1 = new MyPromise(function(resolve, reject){ return p1 })
  // 这里 p1 的成功回调又返回 p1，所以 p1 的 then 方法永远不会执行，永远不会得到结果
  if (promise2 === x) return reject(new TypeError("循环引用"));

  // 确认 then 的成功或失败回调只调用其中一个
  let called = false;

  if (x instanceof MyPromise) {
    // x 是promise
    if (x.status === PENDING) {
      // 等待 x 完成
      x.then(function(y) {
        // 递归调用
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else {
      // 成功或者失败，这直接resolve 或 reject
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        // x 是一个 thenable
        // 直接调用
        then.call(
          x,
          function(y) {
            if (called) return;
            called = true;
            // 递归调用
            resolvePromise(promise2, y, resolve, reject);
          },
          function(reason) {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        // x 不是一个 thenable
        // 用 x 直接 resolve
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      // then 执行抛错
      reject(error);
    }
  } else {
    // x 是一个普通值
    // 直接 resolve x
    resolve(x);
  }
}

/**
 * 柯里化函数
 * Promise.all 的 辅助函数
 * @param {*} times
 * @param {*} cb
 */
function gen(times, cb) {
  let result = [];
  let count = 0;
  return function(i, value) {
    result[i] = value;
    count += 1;
    if (count === times) cb(result);
  };
}

module.exports = MyPromise;

```

## 验证 Promise

跑 Promise 验证脚本

```
 1 npm i install promises-aplus-tests -S
 2 在 package 的 scripts 中添加 "test": "promises-aplus-tests Promise.js"
 3 npm run test
```
