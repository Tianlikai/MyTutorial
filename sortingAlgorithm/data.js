/**
 * 生成n个1-n的整数，存放到数组中
 * @param {*} n
 */
function dataGenerator(n) {
  const data = [];
  for (let i = 0; i < n; i += 1) {
    data.push(Math.floor(Math.random() * n) + 1);
  }
  return data;
}

module.exports = {
  dataGenerator
};
