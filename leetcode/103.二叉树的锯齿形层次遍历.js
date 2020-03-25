/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层次遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  const loop = (node, level, result) => {
    if (!node) return;
    if (!result[level]) result[level] = [];
    level % 2 === 0
      ? result[level].push(node.val)
      : result[level].unshift(node.val);
    loop(node.left, level + 1, result);
    loop(node.right, level + 1, result);
  };
  const result = [];
  loop(root, 0, result);
  return result;
};
// @lc code=end
