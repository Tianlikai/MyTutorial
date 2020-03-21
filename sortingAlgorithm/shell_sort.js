function shell_sort(data) {
  // 这里的增量序列采用是N/2的方式，实际运用有更好的方式
  for (let d = Math.floor(data.length / 2); d > 0; d = Math.floor(d / 2)) {
    for (let p = d; p < data.length; p += 1) {
      const newCard = data[p];
      let i = p;
      for (; i >= d && newCard < data[i - d]; i -= d) {
        data[i] = data[i - d];
      }
      data[i] = newCard;
    }
  }
  return data;
}

module.exports = {
  shell_sort
};
