function co(gen) {
  let it = gen();
  return new Promise(function(resolve, reject) {
    (function next(lastVal) {
      // next方法可以带一个参数
      // 该参数就会被当作上一个yield表达式的返回值。
      let { value, done } = it.next(lastVal);
      if (done) {
        resolve(value);
      } else {
        value.then(next, reject);
      }
    })();
  });
}

module.exports = co;
