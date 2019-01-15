/**
 * async, await 实现方式
 */
const co = require("co");
const fs = require("fs");

function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, "utf-8", function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}

// async function read() {
//   let a = await readFile("1.txt");
//   console.log(a);
//   let b = await readFile("2.txt");
//   console.log(b);
//   let c = await readFile("3.txt");
//   console.log(c);
//   return "ok";
// }

function read() {
  return co(function*() {
    let a = yield readFile("1.txt");
    console.log(a);
    let b = yield readFile("2.txt");
    console.log(b);
    let c = yield readFile("3.txt");
    console.log(c);
    return "ok";
  });
}

read().then(function(resp) {
  console.log(resp);
});
