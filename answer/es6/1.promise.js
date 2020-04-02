const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise2(executor) {
  const self = this;
  self.status = PENDING;

  self.onResolveCallbacks = [];
  self.onRejectCallbacks = [];

  function resolve(value) {
    if (value instanceof Promise2) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolveCallbacks.forEach(cb => cb(self.value));
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.value = reason;
        self.onRejectCallbacks.forEach(cb => cb(self.value));
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
  if (x === promise2) {
    return reject(new TypeError("循环引用"));
  }
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
      const { then } = x;
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
    const promise2 = new Promise2((resolve, reject) => {
      setTimeout(() => {
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
    const promise2 = new Promise2((resolve, reject) => {
      setTimeout(() => {
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
    const promise2 = new Promise2((resolve, reject) => {
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

Promise2.prototype.finally = function(cb) {
  const p = this.constructor;
  return this.then(
    value => p.resolve(cb()).then(() => value),
    reason =>
      p.resolve(cb()).then(() => {
        throw reason;
      })
  );
};

Promise2.deferred = Promise2.defer = function() {
  const defer = {};
  defer.promise = new Promise2(function(resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

Promise2.resolve = function(value) {
  if (value instanceof Promise2) return value;
  return new Promise2((resolve, reject) => {
    if (value && value.then && typeof value.then === "function") {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
};

Promise2.reject = function(reason) {
  return new Promise2((resolve, reject) => {
    reject(reason);
  });
};

function allHelp(len, resolve) {
  let [count, result] = [0, []];
  return function done(value, i) {
    result[i] = value;
    count += 1;
    if (count === len) resolve(result);
  };
}
Promise2.all = function(promises) {
  return new Promise2((resolve, reject) => {
    const next = allHelp(promise.length, resolve);
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then(value => {
        next(value, i);
      }, reject);
    }
  });
};

Promise2.race = function(promises) {
  return new Promise2((resolve, reject) => {
    if (promise.length === 0) return;
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then(resolve, reject);
    }
  });
};

Promise2.serialPromise = function(promises) {
  promises.reduce((acc, cur) => {
    return acc.then(() => {
      cur.then(value => value);
    });
  }, Promise.resolve);
};

module.exports = Promise2;
