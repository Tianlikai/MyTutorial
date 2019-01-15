const fs = require("fs");
// const co = require("co");
const co = require("./co");

function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, "utf-8", function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}

function* read() {
  console.log("begin");
  let a = yield readFile("1.txt");
  console.log(a);
  let b = yield readFile("2.txt");
  console.log(b);
  let c = yield readFile("3.txt");
  console.log(c);
  console.log("end");
  return c;
}

let result = co(read);

result.then(
  function(data) {
    console.log(data);
  },
  function(error) {
    console.log(error);
  }
);

/**
 * next 可以带一个参数
 * 很重要
 * 作为上一个 yield 的返回值
 */
