/**
 * 插入排序
 * InsertSort
 * 算法描述
 * 插入排序的场景和扑克牌排序类似，首先我们手上没有扑克牌，扑克牌在桌上向下摆放，我们每次拿到一张牌都放入正确的位置，为啦找到牌的正确位置，我们会从右往左依次比较。
 * 每次插入后手上的牌都是有序的。
 */
function insertSort(data) {
  for (var outer = 1; outer < data.length; ++outer) {
    var value = data[outer];
    var inner = outer - 1;
    while (inner >= 0 && data[inner] >= value) {
      var temp = data[inner];
      data[inner] = data[inner - 1];
      data[inner - 1] = temp;
      --inner;
    }
    data[inner] = value;
  }
}

let data = [1, 3, 5, 2, 6, 4, 8, 7, 9];

console.log(insertionSort(data));
