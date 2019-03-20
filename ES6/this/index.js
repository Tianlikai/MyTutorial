function foo() {
  "use strict";
  console.log(this);
}
var a = 2;
foo(); // TypeError: this is undefined
