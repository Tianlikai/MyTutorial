/**
 * 将一个普通函异步函数换为返回为promise的函数
 * @param {*} fn
 */
const promisify = fn => (...args) =>
  new Promise(function(resolve, reject) {
    fn.apply(null, [
      ...args,
      function(err, data) {
        err ? reject(err) : resolve(data);
      }
    ]);
  });

module.exports = promisify;
