const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function gen(length, cb) {
  let result = [];
  let count = 0;
  return function(i, value) {
    result[i] = value;
    count += 1;
    if (count === length) cb(result);
  };
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("循环引用"));
  }

  let called = false;

  if (x instanceof Promise) {
    if (x.status === PENDING) {
      x.then(function(y) {
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
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

function Promise(executor) {
  const self = this;
  self.status = PENDING;

  self.onResolveCallbacks = [];
  self.onRejectCallbacks = [];

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }

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

Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };

  const self = this;
  let promise2;

  if (self.status === FULFILLED) {
    return (promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (self.status === REJECTED) {
    return (promise2 = new Promise(function(resolve, reject) {
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
    return (promise2 = new Promise(function(resolve, reject) {
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

Promise.prototype.catch = function(onRejected) {
  this.then(null, onRejected);
};

Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then(resolve, reject);
    }
  });
};

Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    const len = promises.length;
    const done = gen(len, resolve);
    for (let i = 0; i < len; i += 1) {
      promises[i].then(function(value) {
        done(i, value);
      }, reject);
    }
  });
};

Promise.deferred = Promise.defer = function() {
  let defer = {};
  defer.promise = new Promise(function(resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

module.exports = Promise;
