/**
 * 在数组array中交换下标i和j的位置
 * @param {*} array
 * @param {*} i
 * @param {*} j
 */
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

module.exports = {
  swap
};
