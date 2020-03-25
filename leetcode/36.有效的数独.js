/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  let num, boxPos;
  let [ROWS, COLS, BOXES] = [[], [], []];
  const calculateMap = (map, x, y) => {
    map[x][y] ? map[x][y]++ : (map[x][y] = 1);
  };
  for (let i = 0; i < board.length; i += 1) {
    ROWS[i] = {};
    COLS[i] = {};
    BOXES[i] = {};
  }
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      num = board[i][j];
      if (num !== ".") {
        num = parseInt(num, 10);
        boxPos = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        calculateMap(ROWS, i, num);
        calculateMap(COLS, j, num);
        calculateMap(BOXES, boxPos, num);
        if (ROWS[i][num] > 1 || COLS[j][num] > 1 || BOXES[boxPos][num] > 1) {
          return false;
        }
      }
    }
  }
  return true;
};
// @lc code=end
