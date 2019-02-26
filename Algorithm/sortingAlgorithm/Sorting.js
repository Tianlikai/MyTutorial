class Sorting {
  /**
   * 冒泡排序，升序
   * 数据两两比较
   * @param {*} data
   * @returns {void}
   */
  bubbleSortByAsc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp;
    for (let i = data.length; i >= 2; i -= 1) {
      for (let j = 0; j < i - 1; j += 1) {
        if (data[j] > data[j + 1]) {
          temp = data[j + 1];
          data[j + 1] = data[j];
          data[j] = temp;
        }
      }
    }
  }

  /**
   * 冒泡排序，升序
   * 数据两两比较
   * @param {*} data
   * @returns {void}
   */
  bubbleSortByDesc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp;
    for (let i = data.length; i >= 2; i -= 1) {
      for (let j = 0; j < i - 1; j += 1) {
        if (data[j] < data[j + 1]) {
          temp = data[j + 1];
          data[j + 1] = data[j];
          data[j] = temp;
        }
      }
    }
  }

  /**
   * 选择排序 升序
   * j 与 目标值进行比较
   * @param {*} data
   * @returns {void}
   */
  selectionSortByAsc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp, max;
    for (let i = data.length - 1; i > 0; i -= 1) {
      max = i;
      for (let j = i - 1; j >= 0; j -= 1) {
        if (data[j] > data[max]) max = j;
        temp = data[j];
        data[j] = data[max];
        data[max] = temp;
      }
    }
  }

  /**
   * 选择排序 降序
   * j 与 目标值进行比较
   * @param {*} data
   * @returns {void}
   */
  selectionSortByDesc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp, min;
    for (let i = 0; i < data.length - 2; i += 1) {
      min = i;
      for (let j = i + 1; j < data.length - 1; j += 1) {
        if (data[j] < data[min]) min = j;
        temp = data[j];
        data[j] = data[min];
        data[min] = temp;
      }
    }
  }

  /**
   * 插入排序 升序排列 大的数往右挪
   * 对于i 的左侧 [0 ,i - 1] 是一个排好序的数组
   * 对于i 的右侧 [i + 1, n] 是等待插入的元素
   * @param {*} data
   * @returns {void}
   */
  insertionSortByAsc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp;
    for (let i = 1; i < data.length; i += 1) {
      let value = data[i];
      let j = i - 1;
      while (j >= 0 && data[j] > value) {
        temp = data[j + 1];
        data[j + 1] = data[j];
        data[j] = temp;
        j -= 1;
      }
      data[j + 1] = value;
    }
  }

  /**
   * 插入排序 降序排列 小的数往右挪
   * @param {*} data
   * @returns {void}
   */
  insertionSortByDesc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp;
    for (let i = 1; i < data.length; i += 1) {
      let value = data[i];
      let j = i - 1;
      while (j >= 0 && data[j] < value) {
        temp = data[j + 1];
        data[j + 1] = data[j];
        data[j] = temp;
        j -= 1;
      }
      data[j + 1] = value;
    }
  }

  getType(target) {
    return Object.prototype.toString
      .call(target)
      .slice(8, -1)
      .toLocaleLowerCase();
  }
}

let data = [31, 41, 59, 26, 41, 58];
let sort = new Sorting();

sort.selectionSortByAsc(data);
console.log(data);
