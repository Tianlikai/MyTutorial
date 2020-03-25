/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * 广度优先
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  let maxLevel = 0;
  if (root) {
    const queue = [root];
    let levelSize, node;
    while (queue.length) {
      maxLevel += 1;
      levelSize = queue.length;
      for (let i = 0; i < levelSize; i += 1) {
        node = queue.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  }
  return maxLevel;
};
// @lc code=end
