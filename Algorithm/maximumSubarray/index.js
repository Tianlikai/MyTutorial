class MaximumSubarray {
  /**
   * 时间复杂度 O(N^3)
   * i 为 序列的左端
   * j 为 序列的右端
   * k 从 i 扫描到 j
   * @param {*} nums
   * @returns {number}
   */
  ViolentSolutionO3(nums) {
    let maxSum = 0,
      thisSum,
      maxNum,
      i,
      j,
      k,
      len = nums.length;

    for (let i = 0; i < len; i += 1) {
      if (typeof maxNum !== "number" || maxNum < nums[i]) maxNum = nums[i];
      for (let j = i; j < len; j += 1) {
        thisSum = 0;
        for (let k = i; k <= j; k += 1) {
          thisSum += nums[k];
        }
        if (thisSum > maxSum) maxSum = thisSum;
      }
    }
    return maxNum < 0 ? maxNum : maxSum;
  }

  /**
   * 时间复杂度 O(N^2)
   * i 为 序列的左端
   * j 为 序列的右端
   * 减少 对于 j - 1 项值的重复的扫描
   * @param {*} nums
   * @returns {number}
   */
  ViolentSolutionO2(nums) {
    let maxSum = 0,
      thisSum,
      maxNum,
      i,
      j,
      len = nums.length;

    for (let i = 0; i < len; i += 1) {
      if (typeof maxNum !== "number" || maxNum < nums[i]) maxNum = nums[i];
      thisSum = 0;
      for (let j = i; j < len; j += 1) {
        thisSum += nums[j];
        if (thisSum > maxSum) maxSum = thisSum;
      }
    }
    return maxNum < 0 ? maxNum : maxSum;
  }

  /**
   * 分治策略
   * @param {*} nums
   * @returns {number}
   */
  division(nums) {}

  /**
   * 时间复杂度 O(N)
   * 在线计算，保证每次求解都最优
   * @param {*} nums
   * @returns {number}
   */
  onlineCalculation(nums) {
    let thisSum = 0,
      maxSum = thisSum,
      maxNum = nums[0];
    for (let i = 0; i < nums.length; i += 1) {
      if (maxNum < nums[i]) maxNum = nums[i];
      thisSum += nums[i];
      if (thisSum > maxSum) {
        maxSum = thisSum;
      } else if (thisSum < 0) {
        thisSum = 0;
      }
    }
    return maxNum < 0 ? maxNum : maxSum;
  }
}

const data1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const data2 = [-1, -2];
const data3 = [1];
const maxSubArray = new MaximumSubarray();
const res = maxSubArray.onlineCalculation(data1);

console.log(res);
