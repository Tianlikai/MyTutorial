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
}

const ins = new Solution();
const result = ins.myPow2(2, 10);

console.log(result);
