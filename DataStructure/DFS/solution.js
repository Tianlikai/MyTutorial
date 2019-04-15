class Solution {
  /**
   * 51. N皇后
   *
   * @param {*} n
   */
  solveNQueens(n) {
    const result = [];
    const cols = new Set();
    const negativeX = new Set();
    const positiveX = new Set();

    nQueensDfs(n, 0, [], result, cols, negativeX, positiveX);
    return result;
  }
}

function nQueensDfs(n, row, curState, result, negativeX, positiveX) {}
