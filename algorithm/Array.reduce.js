/**
 * 重写reducer
 */
Array.prototype.reduceMe = function(reducer, initialVal) {
  for (let i = 0; i < this.length; ++i) {
    initialVal = reducer(initialVal, this[i], i, this);
  }
  return initialVal;
};

let arr = [1, 2, 3, 4];

const resp = arr.reduceMe(function(pre, value, i, org) {
  return pre + value;
}, 0);
console.log(resp);
