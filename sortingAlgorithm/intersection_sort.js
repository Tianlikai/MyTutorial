function intersection_sort(data) {
  for (let p = 1; p < data.length; p += 1) {
    const newCard = data[p]; /** 拿到一张新牌,第一张牌不用比较 */
    /**
     * 找到新牌的位置
     * 如果新牌小于比较的牌，则将比较的牌往后移一位
     * 最后i退出的位置就是新牌的位置
     */
    let i = p;
    for (; i > 0 && newCard < data[i - 1]; i -= 1) {
      data[i] = data[i - 1];
    }
    data[i] = newCard;
  }
  return data;
}

/**
 * 对data的left到right范围内进行排序
 * @param {*} data
 * @param {*} left 左下标
 * @param {*} right 右下标
 */
function intersection_sort2(data, left, right) {
  for (let p = left + 1; p <= right; p += 1) {
    const newCard = data[p]; /** 拿到一张新牌,第一张牌不用比较 */
    let i = p;
    for (; i > 0 && newCard < data[i - 1]; i -= 1) {
      data[i] = data[i - 1];
    }
    data[i] = newCard;
  }
  return data;
}

module.exports = { intersection_sort, intersection_sort2 };
