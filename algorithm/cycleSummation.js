/**
 * 数组循环求和
 */
let arr = [1, 2, 3, 4];

const count = arr.reduce((init, value, index, ori) => {
  console.log(init, value, index, ori);
  console.log("\n");
  return init + value;
}, 0);
console.log(count);
