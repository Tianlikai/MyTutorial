/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * 二叉搜索树，中序遍历为升序
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  const inOrder = (node, result) => {
    if (node) {
      inOrder(node.left, result);
      if (node.val) {
        result.push(node.val);
      }
      inOrder(node.right, result);
    }
  };
  const result = [];
  inOrder(root, result);
  for (let i = 0; i < result.length; i += 1) {
    if (result[i] >= result[i + 1]) return false;
  }
  return true;
};
// @lc code=end
