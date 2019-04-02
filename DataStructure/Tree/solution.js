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

// 递归解法
function loop(root, level, result) {
  if (!root) return;
  if (!result[level]) {
    result[level] = [root.val];
  } else {
    result[level].push(root.val);
  }
  if (root.left) loop(root.left, level + 1, result);
  if (root.right) loop(root.right, level + 1, result);
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
   * 层序遍历，层层比较
   * @param {*} root
   */
  isSymmetric2(root) {
    if (!root) return true;

    let queue = [];
    queue[root];

    while (queue.length) {
      let layer = [];
      let len = queue.length; // js 的 array 长度会动态修改
      for (let i = 0; i < len; i += 1) {
        let node = queue[0]; // 每次取队列头部进行处理
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        layer.push(node.val);
        // 将遍历后的节点弹出
        queue.shift();
      }

      let p = 0;
      let q = layer.length - 1;
      while (p < q) {
        if (layer[p] !== layer[q]) return false;
        p += 1;
        q -= 1;
      }
    }

    return true;
  }

  /**
   * 102. 二叉树的层次遍历
   * 利用队列实现
   * @param {*} root
   */
  levelOrder(root) {
    let result = [];
    let queue = [];

    if (!root) return result;
    queue[root];

    while (queue.length) {
      let layer = [];
      let len = queue.length; // js 的 array 长度会动态修改
      for (let i = 0; i < len; i += 1) {
        let node = queue[0]; // 每次取队列头部进行处理
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        layer.push(node.val);
        // 将遍历后的节点弹出
        queue.shift();
      }
      result.push(layer);
    }

    return result;
  }

  /**
   * 递归解法
   * @param {*} root
   */
  levelOrder1(root) {
    let result = [];
    loop(root, 0, result);
    return result;
  }
}

const ins = new Solution();

let res = ins.preorderTraversal(root);
console.log(res);
