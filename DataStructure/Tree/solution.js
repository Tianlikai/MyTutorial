class Solution {
  /**
   * leetcode 104. 二叉树的最大深度
   *
   * @param {*} root
   */
  maxDepth(root) {
    return root === null
      ? 0
      : Math.max(this.maxDepth(root.left), this.maxDepth(root.right)) + 1;
  }

  /**
   * leetcode 111. 二叉树的最小深度
   */
  minDepth(root) {
    if (root) {
      if (root.left && root.right) {
        return (
          Math.min(this.minDepth(root.left), this.minDepth(root.right)) + 1
        );
      } else if (root.left) {
        return this.minDepth(root.left) + 1;
      } else if (root.right) {
        return this.minDepth(root.right) + 1;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
}

const ins = new Solution();
