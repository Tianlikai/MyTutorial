/**
 * async, await 语法糖
 * 优点
 * 1 简洁
 * 2 捕获异常
 * 3 同步思路
 */

/**
 * 实现
 * promise + generator
 */
const fs = require("fs");

function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, "utf-8", function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}

async function read() {
  let a = await readFile("1.txt");
  console.log(a);
  let b = await readFile("2.txt");
  console.log(b);
  let c = await readFile("3.txt");
  console.log(c);
  return "ok";
}

read().then(function(resp) {
  console.log(resp);
});
