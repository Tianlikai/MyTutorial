function bubble_sort1(data) {
  for (let p = data.length - 1; p >= 1; p -= 1) {
    for (let i = 0; i < p; i += 1) {
      if (data[i] > data[i + 1]) {
        const temp = data[i + 1];
        data[i + 1] = data[i];
        data[i] = temp;
      }
    }
  }
  return data;
}

function bubble_sort2(data) {
  for (let p = data.length - 1; p > 1; p -= 1) {
    let flag = 0;
    for (let i = 0; i < p; i += 1) {
      if (data[i] > data[i + 1]) {
        const temp = data[i + 1];
        data[i + 1] = data[i];
        data[i] = temp;
        flag = 1;
      }
    }
    if (flag === 0) break; /** 全程无交换，已经有序 */
  }
  return data;
}

module.exports = {
  bubble_sort1,
  bubble_sort2
};
