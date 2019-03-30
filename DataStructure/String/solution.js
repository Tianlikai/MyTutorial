class Solution {
  /**
   * 557. 反转字符串中的单词 III
   * @param {*} s
   */
  reverseWords(s) {
    return s
      .split(" ")
      .reduce((acc, cur, i, source) => `${acc} ${this.reverseString(cur)}`, "");
  }

  /**
   * 344. 反转字符串
   * @param {*} s
   */
  reverseString(s) {
    let str = "";
    for (let i = s.length - 1; i >= 0; i--) {
      str += s[i];
    }
    return str;
  }
}
