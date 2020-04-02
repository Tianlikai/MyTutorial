/**
 * 567.字符串的排列
 * 解题思路
 * 有效异位词结合滑动窗口
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  /**
   * map1记录s1中字符出现的次数
   * map2记录s1中的字符出现在s2中的次数
   */
  const [mapS1, mapS2] = [{}, {}];
  /**
   * start 滑动窗口的起点
   * end 滑动窗口的终点
   * characterLength s1中出现不同字符的总数
   * match s2中已经匹配s1中出现字符的总数
   */
  let [start, end, characterLength, match] = [0, 0, 0, 0];
  // 计算mapS1和characterLength总数
  for (let i of s1) {
    if (mapS1[i]) {
      mapS1[i] += 1;
    } else {
      mapS1[i] = 1;
      characterLength += 1;
    }
  }
  // 遍历s2
  while (end < s2.length) {
    const c2 = s2[end];
    if (mapS1[c2]) {
      // s2中的字符在s1中出现，开始计数
      mapS2[c2] ? mapS2[c2]++ : (mapS2[c2] = 1);
      // s1 和 s2 中出现次数相同，匹配数加一
      if (mapS1[c2] === mapS2[c2]) match++;
    }
    end++;
    while (match === characterLength) {
      // 滑动窗口大小正好等于s1的长度，则返回true
      if (end - start === s1.length) return true;
      let c = s2[start];
      // 移动滑动窗口
      if (mapS1[c]) {
        mapS2[c]--;
        if (mapS2[c] < mapS1[c]) {
          match--;
        }
      }
      start++;
    }
  }
  return false;
};

const res = checkInclusion("ab", "eidbaooo");
console.log(res);

function checkInclusion2(s1, s2) {
  const [map1, map2] = [{}, {}];
  let [start, end, characterLength, match] = [0, 0, 0, 0];
  for (let i of s1) {
    if (map1[i]) {
      map1[i]++;
    } else {
      map1[i] = 1;
      characterLength++;
    }
  }
  while (end < s2.length) {
    const c2 = s2[end];
    if (map1[c2]) {
      map2[c2] ? map2[c2]++ : (map2[c2] = 1);
      if (map1[c2] === map2[c2]) match++;
    }
    end++;
    while (match === characterLength) {
      if (end - start === s1.length) return true;
      const c = s2[start];
      if (map1[c]) {
        map2[c]--;
        if (map2[c] < map1[c]) match--;
      }
      start++;
    }
  }
}
