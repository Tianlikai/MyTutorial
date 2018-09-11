/**
 * 选择排序
 * 两两一次比较，将最大的值移动到最右侧
 * @param {arr} data
 * @return {arr} 返回排序后的数组（升序）
 */
function selectionSort(data) {
  let len = data.length;
  for (let outer = 0; outer < len - 2; ++outer) {
    let min = outer;
    for (let j = outer + 1; j < len - 1; ++j) {
      if (data[j] < data[min]) {
        min = j;
      }
      let temp = data[outer];
      data[outer] = data[min];
      data[min] = temp;
    }
  }
  return data;
}

let data = [1, 3, 5, 2, 6, 4, 8, 7, 9];

console.log(selectionSort(data));
