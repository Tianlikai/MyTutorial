const fs = require("fs");
const co = require("co");

function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, "utf-8", function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}

function* read() {
  let a = yield readFile("1.txt");
  let b = yield readFile("2.txt");
  let c = yield readFile("3.txt");
}

co(read);

let resp = read();
console.log(resp.next());
console.log(resp.next());
console.log(resp.next());
console.log(resp.next());
