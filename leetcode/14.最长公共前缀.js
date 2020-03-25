/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return "";
  let result = strs[0];
  for (let i = 1; i < strs.length; i += 1) {
    let j = 0;
    for (; j < result.length && j < strs[i].length; j += 1) {
      if (result[j] !== strs[i][j]) break;
    }
    result = result.substr(0, j);
    if (result.length === 0) return "";
  }
  return result;
};
// @lc code=end
