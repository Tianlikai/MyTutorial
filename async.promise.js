/**
 * Promises/A+规范 中文版
 * https://www.ituring.com.cn/article/66566
 * 定义：什么是promise，承诺将要要做的事情，等到我能做的时候去做。
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise2(executor) {
  const self = this;
  self.status = PENDING;

  self.onResolveCallbacks = [];
  self.onRejectCallbacks = [];

  function resolve(value) {
    if (value instanceof Promise2) return value.then(resolve, reject);
    setTimeout(function() {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolveCallbacks.forEach(function(cb) {
          cb(self.value);
        });
      }
    });
  }

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
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) return reject(new TypeError("循环引用"));

  let called = false;
  if (x instanceof Promise2) {
    if (x.status === PENDING) {
      x.then(function(y) {
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function(y) {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          function(reason) {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

Promise2.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };

  const self = this;

  if (self.status === FULFILLED) {
    const promise2 = new Promise2(function(resolve, reject) {
      setTimeout(function() {
        try {
          const x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
    return promise2;
  }

  if (self.status === REJECTED) {
    const promise2 = new Promise2(function(resolve, reject) {
      setTimeout(function() {
        try {
          const x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
    return promise2;
  }

  if (self.status === PENDING) {
    const promise2 = new Promise2(function(resolve, reject) {
      self.onResolveCallbacks.push(function() {
        try {
          const x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
      self.onRejectCallbacks.push(function() {
        try {
          const x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
    return promise2;
  }
};

Promise2.prototype.catch = function(onRejected) {
  this.then(null, onRejected);
};

Promise2.deferred = Promise2.defer = function() {
  const defer = {};
  defer.promise = new Promise2(function(resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

function helpPromiseAll(promiseLen, resolve) {
  const result = [];
  let count = 0;
  function done(i, value) {
    result[i] = value;
    count += 1;
    if (promiseLen === count) resolve(result);
  }
  return done;
}

Promise2.all = function(promises) {
  return new Promise2(function(resolve, reject) {
    const promiseLen = promises.length;
    const done = helpPromiseAll(promiseLen, resolve);
    for (let i = 0; i <= promiseLen; i += 1) {
      promises[i].then(function(value) {
        done(value, i);
      }, reject);
    }
  });
};

Promise2.race = function(promises) {
  return new Promise2(function(resolve, reject) {
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then(resolve, reject);
    }
  });
};

Promise2.serialPromise = function(promises) {
  promises.reduce(function(acc, cur) {
    return acc.then(value => cur.then(value => value));
  }, Promise.resolve());
};

Promise2.finally = function(cb) {
  const p = this.constructor;
  return this.then(
    value => p.resolve(cb()).then(() => value),
    reason =>
      p.resolve(cb()).then(() => {
        throw reason;
      })
  );
};
module.exports = Promise2;
