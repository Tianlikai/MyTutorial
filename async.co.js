const co = gen => {
  const iterator = gen();
  return new Promise(function(resolve, reject) {
    (function next(lastValue) {
      const { value, done } = iterator.next(lastValue);
      if (done) {
        resolve(value);
      } else {
        value.then(next, reject);
      }
    })();
  });
};

module.exports = co;
