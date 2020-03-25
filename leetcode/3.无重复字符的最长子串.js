/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let [max, tempString, i] = [0, ""];
  for (const c of s) {
    i = tempString.indexOf(c);
    if (i >= 0) tempString = tempString.slice(i + 1);
    tempString += c;
    max = Math.max(max, tempString.length);
  }
  return max;
};

module.exports = {
  lengthOfLongestSubstring
};
