const { swap } = require("./swap");
const { intersection_sort2 } = require("./intersection_sort");

/**
 * 选主元
 * 取头，中，尾的中位数
 * @param {*} array 原数组
 * @param {*} left 起始位置
 * @param {*} right 结束位置
 * @return {返回中位数}
 */
function median3(array, left, right) {
  const center = Math.floor((right - left) / 2);
  // 将最小值放到最左边
  if (array[left] > array[center]) {
    swap(array, left, center);
  }
  if (array[left] > array[right]) {
    swap(array, left, right);
  }
  // 将最大值放到最右边
  if (array[center] > array[right]) {
    swap(array, center, right);
  }
  // 由于left肯定是小于中位数，right肯定大于中位数
  // 所以将中位数放到right - 1的位置
  // 在之后划分子集的过程中只需要考虑 left + 1 到 right - 2
  swap(array, center, right - 1);
  // 返回主元
  return array[right - 1];
}

/**
 * 快速排序
 * @param {*} array
 * @param {*} left
 * @param {*} right
 */
function quick_sort1(array, left, right) {
  if (3 < right - left) {
    // 如果比较元素大于三个，使用快排
    // 选主元
    const pivot = median3(array, left, right);
    let i = left - 1;
    let j = right - 1;
    for (;;) {
      while (array[++i] < pivot) {} // left存放的值肯定比主元小，所以左边从 left + 1 开始
      while (array[--j] > pivot) {} // right存放的值肯定比主元大，并且主元存放在 right - 1,所以右边从 right - 2开始
      if (i < j) {
        // 此时，下标为i的值大于主元，下标为j的值小于主元，所以交换下标i和j的值
        swap(array, i, j);
      } else {
        // 越界，直接退出循环，此时下标i就是主元的位置
        break;
      }
    }
    // 将主元换到正确的位置
    swap(array, i, right - 1);
    // 对左边进行递归
    quick_sort1(array, left, i - 1);
    // 对右边进行递归
    quick_sort1(array, i + 1, right);
  } else {
    // 比较元素小于等于3个，使用插入排序
    intersection_sort2(array, left, right - left + 1);
  }
}
// TODO: 动态主元之后做

/**
 * 固定主元
 * 主元选取array的最后一个元素
 * @param {*} array
 * @param {*} left
 * @param {*} right
 */
function quick_sort2(array, left, right) {
  if (right - left >= 1) {
    const pivot = array[right];
    let i = left - 1;
    let j = right;
    for (;;) {
      while (array[++i] < pivot) {}
      while (array[--j] > pivot) {}
      if (i < j) {
        swap(array, i, j);
      } else {
        break;
      }
    }
    swap(array, i, right);
    quick_sort2(array, left, i - 1);
    quick_sort2(array, i + 1, right);
  }
}

module.exports = { quick_sort1, quick_sort2 };
