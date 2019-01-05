let MyPromise = require("./Promise");

let p1 = new MyPromise(function(resolve, reject) {
  setTimeout(function() {
    let num = Math.random();
    if (num < 0.5) {
      resolve(num);
    } else {
      reject("失败");
    }
  }, 1000);
});

p1.then(
  function(resp) {
    console.log(resp);
  },
  function(error) {
    console.log(error);
  }
);
