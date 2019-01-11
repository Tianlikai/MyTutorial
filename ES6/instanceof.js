/**
 * instanceof 关系演算
 * L instanceof R
 * @param {*} L
 * @param {*} R
 */
function instanceof2(L, R) {
  var O = R.prototype;
  console.log("R", O);
  L = L.__proto__;
  while (true) {
    console.log("L", L);
    if (L === null) {
      console.log(false);
      return false;
    }
    if (L == O) {
      console.log(true);
      return true; // 此时判断全等于
    }
    L = L.__proto__;
  }
}
function Foo() {}

var res1 = instanceof2(Object, Object); // true
var res1 = instanceof2(Function, Function); //  true
var res1 = instanceof2(Function, Object); //  true
var res1 = instanceof2(Object, Function); //  true
var res1 = instanceof2(String, String); // false
var res1 = instanceof2(String, Function); // true
var res1 = instanceof2(Foo, Foo); // false
