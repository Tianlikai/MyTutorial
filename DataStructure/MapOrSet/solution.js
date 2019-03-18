class Solution {
  /**
   * leetcode 242
   *
   * 有效的字母异位词
   * @param {*} s
   * @param {*} t
   */
  isAnagram1(s, t) {
    let map1 = {};
    let map2 = {};
    for (let c of s) {
      map1[c] = !map1[c] ? 1 : map1[c] + 1;
    }
    for (let c of t) {
      map2[c] = !map2[c] ? 1 : map2[c] + 1;
    }
    return map1 == map2;
  }
}
