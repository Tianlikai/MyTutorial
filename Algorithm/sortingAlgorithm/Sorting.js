class Sorting {
  /**
   * 冒泡排序，升序
   * 数据两两比较
   * @param {*} data
   * @returns {void}
   */
  bubbleSortByAsc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    for (let i = data.length; i >= 2; i -= 1) {
      for (let j = 0; j < i - 1; j += 1) {
        if (data[j] > data[j + 1]) this.swap(data, j, j + 1);
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
    for (let i = data.length; i >= 2; i -= 1) {
      for (let j = 0; j < i - 1; j += 1) {
        if (data[j] < data[j + 1]) this.swap(data, j, j + 1);
      }
    }
  }

  /**
   * 选择排序 升序
   * 找到数组最小值的下标 min，将外层循环 i 的值和 min 的值相互调换
   * @param {*} data
   * @returns {void}
   */
  selectionSortByAsc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp, min;
    for (let i = 0; i < data.length - 1; i += 1) {
      min = i;
      for (let j = i + 1; j < data.length; j += 1) {
        if (data[j] < data[min]) min = j;
      }
      this.swap(data, i, min);
    }
  }

  /**
   * 选择排序 降序
   * 找到数组最大值的下标 max，将外层循环 i 的值和 max 的值相互调换
   * @param {*} data
   * @returns {void}
   */
  selectionSortByDesc(data) {
    if (this.getType(data) !== "array" || data.length <= 1) return data;
    let temp, max;
    for (let i = 0; i < data.length - 1; i += 1) {
      max = i;
      for (let j = i + 1; j < data.length; j += 1) {
        if (data[j] > data[max]) max = j;
      }
      this.swap(data, i, max);
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
        this.swap(data, j, j + 1);
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
        this.swap(data, j, j + 1);
        j -= 1;
      }
      data[j + 1] = value;
    }
  }

  /**
   * 将数组arr 下标a和b的值相互调换
   * @param {Array} arr
   * @param {number} a
   * @param {number} b
   */
  swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
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

sort.insertionSortByDesc(data);
console.log(data);
