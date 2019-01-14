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
          function(error) {
            if (called) return;
            called = true;
            reject(error);
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

  let self = this;
  let promise2;

  if (self.status === FULFILLED) {
    return (promise2 = new Promise2(function(resolve, reject) {
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
