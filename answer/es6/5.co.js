const fs = require("fs");

const co = gen => {
  const iterator = gen();
  return new Promise((resolve, reject) => {
    (function next(lastValue) {
      const { done, value } = iterator.next(lastValue);
      if (done) {
        resolve(value);
      } else {
        value.then(next, reject);
      }
    })();
  });
};

module.exports = { co };

const readFilePromise = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });

function* gen() {
  const a = yield readFilePromise("./1.promise.js");
  console.log(a);
  const b = yield readFilePromise("./2.promisify.js");
  console.log(b);
  const c = yield readFilePromise("./3.iterator.js");
  console.log(c);
}

co(gen);
