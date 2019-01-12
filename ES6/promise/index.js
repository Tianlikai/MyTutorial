let MyPromise = require("./Promise");

let p1 = new MyPromise(function(resolve, reject) {
  // resolve("直接resolve");
  // reject("直接reject");
  setTimeout(function() {
    let num = Math.random();
    if (num < 0.5) {
      resolve(num);
    } else {
      reject("失败");
    }
  });
});

// 值需要实现穿透
let p2 = p1.then();
// p2.then(
//   function(data) {
//     console.log(data);
//   },
//   function(reason) {
//     console.log(reason);
//   }
// );

// p1.then(
//   function(resp) {
//     console.log(resp);
//   },
//   function(error) {
//     console.log(error);
//   }
// );
