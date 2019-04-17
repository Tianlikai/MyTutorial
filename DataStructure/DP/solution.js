class Solution {
  /**
   * 70. 爬楼梯
   * 简化为斐波拉契问题
   *
   * 地推公式
   * @param {number} n
   * @return {number}
   */
  climbStairs(n) {
    const F = [1, 1];
    for (let i = 2; i <= n; i += 1) {
      F[i] = F[i - 1] + F[i - 2];
    }
    return F;
  }

  /**
   * 记忆化，去除重复访问
   * @param {*} n
   */
  climbStairs2(n) {
    return climbStairsLoop(n, {});
  }
}

function climbStairsLoop(n, memo) {
  if (n < 2) return 1;
  if (memo[n]) return memo[n];
  memo[n] = climbStairsLoop(n - 1, memo) + climbStairsLoop(n - 2, memo);
  return memo[n];
}

const ins = new Solution();
const result = ins.climbStairs2(4);
console.log(result);
