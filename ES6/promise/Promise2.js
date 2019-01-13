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
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = FULFILLED;
        self.value = value;
        self.onResolveCallbacks.forEach(cb => {
          cb(self.value);
        });
      });
    }
  }

  /**
   * 执行器 中调用的 reject方法
   * @param {*} reason 失败的理由
   */
  function reject(reason) {
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = REJECTED;
        self.value = reason;
        self.onRejectCallbacks.forEach(cb => {
          cb(self.value);
        });
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

/**
 *
 * @param {*} onFulfilled
 * @param {*} onRejected
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

  if (self.status === FULFILLED) {
    onFulfilled(self.value);
  }

  if (self.status === REJECTED) {
    onRejected(self.value);
  }

  if (self.status === PENDING) {
    self.onResolveCallbacks.push(function() {
      onFulfilled(self.value);
    });

    self.onRejectCallbacks.push(function() {
      onRejected(self.value);
    });
  }
};
module.exports = Promise2;
