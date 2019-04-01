function preOrder(root, result) {
  if (root) {
    result.push(root.val);
    if (root.left) {
      preOrder(root.left, result);
    }
    if (root.right) {
      preOrder(root.right, result);
    }
  }
}

function inOrder(root, result) {
  if (root) {
    if (root.left) {
      inOrder(root.left, result);
    }
    if (root.val !== null) {
      result.push(root.val);
    }
    if (root.right) {
      inOrder(root.right, result);
    }
  }
}

function postOrder(root, result) {
  if (root) {
    if (root.left) {
      postOrder(root.left, result);
    }
    if (root.right) {
      postOrder(root.right, result);
    }
    result.push(root.val);
  }
}

function ismirror(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return (
    p.val === q.val && ismirror(p.right, q.left) && ismirror(p.left, q.right)
  );
}

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

  /**
   * leetcode
   *
   * 98验证二叉搜索树
   * @param {*} root
   */
  isValidBST(root) {
    let result = [];
    inOrder(root, result);
    // 二插搜索树，中序遍历为升序
    for (let i = 0; i < result.length - 1; i += 1) {
      if (result[i] >= result[i + 1]) return false;
    }
    return true;
  }

  /**
   * leetcode
   * 144. 二叉树的前序遍历
   */
  preorderTraversal(root) {
    let result = [];
    preOrder(root, result);
    return result;
  }

  /**
   * leetcode
   * 94. 二叉树的中序遍历
   * @param {*} root
   */
  inorderTraversal(root) {
    let result = [];
    inOrder(root, result);
    return result;
  }

  /**
   * leetcode
   * 145. 二叉树的后序遍历
   * @param {*} root
   */
  postorderTraversal(root) {
    let result = [];
    inOrder(root, result);
    return result;
  }

  /**
   * 101. 对称二叉树
   *
   * 递归解法
   * @param {*} root
   */
  isSymmetric(root) {
    return ismirror(root, root);
  }

  /**
   * 迭代解法
   * @param {*} root
   */
  isSymmetric2(root) {}
}

const ins = new Solution();

let res = ins.preorderTraversal(root);
console.log(res);
