/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  const cols = new Set(); // 列
  const sum_xy = new Set(); // x + y
  const diff_xy = new Set(); // x-y
  const result = [];
  /**
   * 递归
   * @param {*} row 行
   * @param {*} queens 存放一次递归找到的皇后
   */
  const recursion = (row, queens) => {
    if (row === n) {
      result.push(queens.slice(0));
      return;
    }
    for (let col = 0; col < n; col += 1) {
      if (cols.has(col) || sum_xy.has(col + row) || diff_xy.has(col - row)) {
        continue;
      }
      cols.add(col);
      sum_xy.add(col + row);
      diff_xy.add(col - row);
      queens.push(col);
      recursion(row + 1, queens);
      queens.pop();
      cols.delete(col);
      sum_xy.delete(col + row);
      diff_xy.delete(col - row);
    }
  };
  const generateOutput = twoDimensionalArray => {
    return twoDimensionalArray.map(queens => {
      return queens.map(queen => {
        let line = "";
        for (let i = 0; i < n; i += 1) {
          line += i === queen ? "Q" : ".";
        }
        return line;
      });
    });
  };
  recursion(0, []);
  return generateOutput(result);
};
// @lc code=end
