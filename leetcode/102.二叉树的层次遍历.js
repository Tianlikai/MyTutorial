/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层次遍历
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
 * bfs
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const result = [];
  if (root) {
    const queue = [root];
    while (queue.length > 0) {
      const levelSize = queue.length;
      const levelArray = [];
      for (let i = 0; i < levelSize; i += 1) {
        const node = queue.shift();
        levelArray.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      result.push(levelArray);
    }
    return result;
  }
  return result;
};
// @lc code=end
