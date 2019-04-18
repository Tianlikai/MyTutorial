/**
 *
 * @param {*} i 深度
 * @param {*} j 广度
 * @param {*} sum 和
 * @param {*} array 原二维数组
 * @param {*} result sum 数组
 */
function minimumTotalLoop(i, j, sum, array, result, depth) {
  if (i >= depth) {
    return result.push(sum);
  }
  let width = array[i].length;
  for (let k = 0; k < width; k += 1) {
    minimumTotalLoop(i + 1, k, sum + array[i][k], array, result, depth);
    minimumTotalLoop(i + 1, k + 1, sum + array[i][k + 1], array, result, depth);
  }
}

function climbStairsLoop(n, memo) {
  if (n < 2) return 1;
  if (memo[n]) return memo[n];
  memo[n] = climbStairsLoop(n - 1, memo) + climbStairsLoop(n - 2, memo);
  return memo[n];
}

/**
 *
 * @param {number} i 下标
 * @param {array} nums 原数组
 * @param {*} tempLMax 从左起，累计乘积
 * @param {*} tempRMax 从右起，累计乘积
 * @param {*} max 最大值
 */
function loopMaxProduct(i, nums, tempLMax, tempRMax, max) {
  if (i >= nums.length) {
    return max;
  }
  tempLMax *= nums[i];
  tempRMax *= nums[nums.length - i - 1];
  max = Math.max(max, Math.max(tempLMax, tempRMax));
  if (tempLMax === 0) tempLMax = 1;
  if (tempRMax === 0) tempRMax = 1;
  return loopMaxProduct(i + 1, nums, tempLMax, tempRMax, max);
}

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

  fib(N) {
    if (N === 0) {
      return 0;
    }
    const Fib = [0, 1];
    for (let i = 2; i <= N; i += 1) {
      Fib[i] = Fib[i - 1] + Fib[i - 2];
    }
    return Fib[Fib.length - 1];
  }

  /**
   * 120. 三角形最小路径和
   *
   * @param {number[][]} triangle
   * @return {number}
   */
  minimumTotal(triangle) {
    const depth = triangle.length;
    const result = [];
    minimumTotalLoop(0, 0, 0, triangle, result, depth);
    return result;
  }

  /**
   * 120. 三角形最小路径和
   *
   * 动态规划方案
   * @param {*} triangle
   */
  minimumTotal2(triangle) {
    // 倒数第二行开始
    for (let i = triangle.length - 2; i >= 0; i -= 1) {
      for (let j = 0; j < triangle[i].length; j += 1) {
        const left = triangle[i + 1][j];
        const right = triangle[i + 1][j + 1];
        triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
        console.log(triangle[i][j]);
      }
    }
    return triangle[0][0];
  }

  /**
   * leetcode 152. 乘积最大子序列
   *
   * 循环
   * @param {number[]} nums
   * @return {number}
   */
  maxProduct(nums) {
    let max = nums[0];
    let left = 1;
    let right = 1;
    for (let i = 0; i < nums.length; i += 1) {
      left *= nums[i];
      right *= nums[nums.length - i - 1];
      max = Math.max(max, left, right);
      if (left == 0) left = 1;
      if (right == 0) right = 1;
    }
    return max;
  }

  /**
   * leetcode 152. 乘积最大子序列
   *
   * 递归
   * @param {number[]} nums
   * @return {number}
   */
  maxProduct2(nums) {
    if (nums.length === 1) return nums[0];
    return loopMaxProduct(0, nums, 1, 1, nums[0]);
  }

  /**
   * leetcode 152. 乘积最大子序列
   *
   * 动态规划
   * @param {number[]} nums
   * @return {number}
   */
  maxProduct3(nums) {
    if (!nums) return 0;
    const dp = [];
    dp[0] = [];
    dp[0][0] = nums[0];
    dp[0][1] = nums[0];
    let max = nums[0];

    for (let i = 1; i < nums.length; i += 1) {
      if (!dp[i]) dp[i] = [];

      dp[i][0] = Math.max(
        dp[i - 1][0] * nums[i],
        dp[i - 1][1] * nums[i],
        nums[i]
      );

      dp[i][1] = Math.min(
        dp[i - 1][0] * nums[i],
        dp[i - 1][1] * nums[i],
        nums[i]
      );

      max = Math.max(max, dp[i][0]);
    }
    return max;
  }
}

const array = [2, -5, -2, -4, 3];

const ins = new Solution();
const result = ins.maxProduct3(array);
console.log(result);
