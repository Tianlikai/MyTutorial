/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let l, r, target;
  const result = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i += 1) {
    target = -nums[i];
    l = i + 1;
    r = nums.length - 1;
    while (l < r) {
      if (nums[l] + nums[r] < target) {
        l += 1;
      } else if (nums[l] + nums[r] > target) {
        r -= 1;
      } else {
        result.push([-target, nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) {
          // 加速， 去重复
          l += 1;
        }
        while (l < r && nums[r] === nums[r - 1]) {
          // 加速， 去重复
          r -= 1;
        }
        l += 1;
        r -= 1;
      }
    }
    while (i < nums.length - 2 && nums[i] === nums[i + 1]) {
      // 加速， 去重复
      i += 1;
    }
  }
  return result;
};
// @lc code=end
