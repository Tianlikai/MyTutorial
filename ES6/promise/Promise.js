const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  const self = this;
  self.status = PENDING;

  self.onResolveCallbacks = [];
  self.onRejectCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }

    setTimeout(function() {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolveCallbacks.foreach(function(cb) {
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
        self.onRejectCallbacks.foreach(function(cb) {
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
  if (x instanceof MyPromise) {
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
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

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

  if (self.status === FULFILLED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
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
    return (promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onRejected(self.value);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (self.status === PENDING) {
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

module.exports = MyPromise;
