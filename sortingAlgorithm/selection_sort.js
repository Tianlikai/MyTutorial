function selection_sort(data) {
  for (let i = 0; i < data.length; i += 1) {
    /**
     * 从data[i]到data[data.length - 1]中找出最小值下标
     */
    let minPos = i;
    for (let j = i + 1; j < data.length; j += 1) {
      if (data[j] < data[minPos]) minPos = j;
    }
    // 如果本身就是最小值则不需要交换
    if (minPos !== i) {
      const temp = data[minPos];
      data[minPos] = data[i];
      data[i] = temp;
    }
  }
  return data;
}

module.exports = {
  selection_sort
};
