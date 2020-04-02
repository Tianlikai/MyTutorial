const promisify = fn => (...args) =>
  new Promise((resolve, reject) => {
    fn.apply(null, [
      ...args,
      function(error, data) {
        error ? reject(error) : resolve(data);
      }
    ]);
  });
