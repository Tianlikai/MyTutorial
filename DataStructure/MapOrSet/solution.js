class Solution {
  /**
   * leetcode 242
   *
   * 有效的字母异位词
   * @param {*} s
   * @param {*} t
   */
  isAnagram1(s, t) {
    let map1 = {};
    let map2 = {};
    for (let c of s) {
      map1[c] = !map1[c] ? 1 : map1[c] + 1;
    }
    for (let c of t) {
      map2[c] = !map2[c] ? 1 : map2[c] + 1;
    }
    return map1 == map2;
  }

  /**
   * leetcode 1
   * 两数之和
   *
   * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
   * @param {*} nums
   * @param {*} target
   */
  twoSum1(nums, target) {
    for (let i = 0; i < nums.length; i += 1) {
      var a = nums[i];
      let arr = nums.slice(i + 1).findIndex(item => item === target - a);
      if (j >= 0) return [i, j + i + 1];
    }
  }

  /**
   * 两数之和
   * map 解法
   * @param {*} nums
   * @param {*} target
   */
  twoSum2(nums, target) {
    let set = [];
    for (let i = 0; i < nums.length; i += 1) {
      let item = nums[i];
      let k = set.indexOf(target - item);
      if (k >= 0) return [k, i];
      set.push(item);
    }
  }

  twoSum3(nums, target) {
    let map = {};
    for (let i = 0; i < nums.length; i += 1) {
      let item = nums[i];
      if (map[target - item] !== undefined) return [target - item, i];
      map[item] = i;
    }
  }
}
var s = new Solution();

const res = s.twoSum([11, 2, 8, 7], 9);
console.log(res);
