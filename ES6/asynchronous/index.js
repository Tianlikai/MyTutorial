const Observer = require("./observer");

function offWork(callback) {
  console.log("上班ing...");
  setTimeout(function() {
    console.log("下班啦");
    if (callback) {
      callback();
    }
  }, 1000);
}

function backHome(callback) {
  console.log("回家中...");
  setTimeout(function() {
    console.log("到家啦");
    if (callback) {
      callback();
    }
  }, 1000);
}

// 基于回调模式
// offWork(function() {
//   backHome();
// });

var observer = new Observer();
observer.queue([offWork, backHome], function(data) {
  console.log("eating");
});
