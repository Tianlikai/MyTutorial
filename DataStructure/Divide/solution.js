class Solution {
  /**
   * leetcode 50
   *
   * @param {number} x
   * @param {number} n
   * @return {number}
   */
  myPow(x, n) {
    return Math.pow(x, n);
  }

  /**
   * 分治
   * @param {number} x
   * @param {number} n
   * @return {number}
   */
  myPow2(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / this.myPow2(x, -n);
    if (n % 2 !== 0) {
      return x * this.myPow2(x, n - 1);
    }
    return this.myPow2(x * x, n / 2);
  }

  /**
   * leetcode 22 括号生成
   * 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
   *
   * @param {number} n
   * @return {string[]}
   */
  generateParenthesis(n) {
    const result = [];
    loopParenthesis(0, 0, n, "", result);
    return result;
  }
}

function loopParenthesis(left, right, n, str, result) {
  if (left === n && right == n) {
    result.push(str);
    return;
  }
  if (left < n) {
    loopParenthesis(left + 1, right, n, `${str}(`, result);
  }
  if (right < left) {
    loopParenthesis(left, right + 1, n, `${str})`, result);
  }
}

const ins = new Solution();
const result = ins.generateParenthesis(2);

console.log(result);
