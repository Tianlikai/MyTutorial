/**
 * 归并排序的核心,有须子列的归并
 * 时间复杂度T=O(N)
 * @param {array} array 原数组
 * @param {array} tempArray 临时数组
 * @param {number} LS 左数组起始位置
 * @param {number} RS 右数组起始位置
 * @param {number} RE 右数组结束位置
 */
function m_sort(array, tempArray, LS, RS, RE) {
  // 左数组结束位置
  const LE = RS - 1;
  // 归并元素的总个数
  const num = RE - LS + 1;
  // 临时数组的存放位置的起点
  let tmpPointer = LS;
  while (LS <= LE && RS <= RE) {
    if (array[LS] < array[RS]) {
      tempArray[tmpPointer++] = array[LS];
      LS += 1;
    } else {
      tempArray[tmpPointer++] = array[RS];
      RS += 1;
    }
  }
  for (; LS <= LE; LS += 1) {
    tempArray[tmpPointer++] = array[LS];
  }
  for (; RS <= RE; RS += 1) {
    tempArray[tmpPointer++] = array[RS];
  }
  for (let i = 0; i < num; i += 1, RE -= 1) {
    array[RE] = tempArray[RE];
  }
}

/**
 * 递归实现
 */
function merge_sort1() {}

module.exports = {
  m_sort
};
/**
 * test
 */
// const data1 = [2, 8, 20, 40, 50];
// const data2 = [3, 5, 6, 18, 35, 66, 77];
// const array = [...data1, ...data2];
// const tempArray = new Array(array.length);
// const LS = 0;
// const RS = data1.length;
// const RE = array.length - 1;
// m_sort(array, tempArray, LS, RS, RE);
// console.log(array);
