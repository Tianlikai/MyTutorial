// function A() {
//   if (typeof A.ins === "object") {
//     return A.ins;
//   }

//   this.start_time = 0;
//   this.bang = "big";

//   A.ins = this;
//   return this;
// }

function A() {
  var ins = this;
  this.start = 0;
  this.bang = "jason";

  A = function() {
    return ins;
  };
}
var a = new A();
var b = new A();

console.log(a === b);

console.log(a);
console.log(b);
