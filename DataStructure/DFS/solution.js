class Solution {
  /**
   * 51. N皇后
   *
   * @param {*} n
   */
  solveNQueens(n) {
    if (n <= 1) return [];
    const result = [];
    const cols = new Set();
    const negativeX = new Set();
    const positiveX = new Set();
    nQueensDfs(n, 0, [], result, cols, negativeX, positiveX);
    return result;
  }

  /**
   * leetcode 100. 相同的树
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {boolean}
   */
  isSameTree(p, q) {
    if (!p && !q) return true;
    if (p !== null && q !== null && p.val === q.val) {
      return (
        this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right)
      );
    } else {
      return false;
    }
  }
}

/**
 * 深度优先
 *
 * @param {*} n n x n 棋盘
 * @param {*} row 行
 * @param {*} curState
 * @param {*} result
 * @param {*} cols 列集合
 * @param {*} negativeX y = -x 集合
 * @param {*} positiveX y = x 集合
 */
function nQueensDfs(n, y, curState, result, cols, negativeX, positiveX) {
  if (y >= n) {
    return result.push(curState);
  }

  for (let x = 0; x < n; x += 1) {
    if (cols.has(x) || negativeX.has(x + y) || positiveX.has(y - x)) {
      continue;
    }

    cols.add(x);
    negativeX.add(x + y);
    positiveX.add(y - x);

    curState.push(x);
    nQueensDfs(n, y + 1, curState, result, cols, negativeX, positiveX);

    cols.clear();
    negativeX.clear();
    positiveX.clear();
  }
}

const ins = new Solution();
const result = ins.solveNQueens(4);

for (let i = 0; i < result.length; i += 1) {
  debugger;
  console.log(result[i]);
}
