const fs = require("fs");
const co = require("./async.co");

const readFile = fileName =>
  new Promise(function(resolve, reject) {
    fs.readFile(fileName, "utf8", function(err, data) {
      err ? reject(err) : resolve(data);
    });
  });

function* read() {
  const a = yield readFile("call.js");
  console.log(a);
  const b = yield readFile("apply.js");
  console.log(b);
  const c = yield readFile("bind.js");
  console.log(c);
  return c;
}

co(read);
