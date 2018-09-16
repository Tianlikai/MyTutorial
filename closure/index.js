function constFunc() {
  var funcs = [];
  for (var i = 0; i < 10; ++i) {
    funcs[i] = function() {
      return i;
    };
  }
  return funcs;
}
let funcs = constFunc();
let res = funcs[5]();
console.log(res);
