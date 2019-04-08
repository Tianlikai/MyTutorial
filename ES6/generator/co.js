function co(gen) {
  let it = gen();
  return new Promise(function(resolve, reject) {
    function next(lastVal) {
      let { value, done } = it.next(lastVal);
      if (done) {
        resolve(value);
      } else {
        value.then(next, reject);
      }
    }
    next();
  });
}

function co2(gen) {
  const it = gen();
  return new Promise(function(resolve, reject) {
    function next(lastVal) {
      let { value, done } = it.next(lastVal);
      if (done) {
        resolve(value);
      }
      value.then(next, reject);
    }
    next();
  });
}

module.exports = co;
