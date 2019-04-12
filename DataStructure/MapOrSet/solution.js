function comparison(map1, map2) {
  let keys1 = Object.keys(map1);
  let keys2 = Object.keys(map2);
  if (keys1.length !== keys2.length) return false;
  for (let i = 0; i < keys1.length; i += 1) {
    let key = keys1[i];
    if (!(key in map2) || map1[key] !== map2[key]) return false;
  }
  return true;
}
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
    return comparison(map1, map2);
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

  /**
   * leetcode 15. 三数之和
   *
   * o(n^2) 解决
   */
  threeSum(nums) {
    let i, j, target, a, len, map, result;
    nums = nums.sort((x, y) => x - y);
    result = {};
    len = nums.length;
    for (i = 0; i < len - 1; i += 1) {
      target = nums[i];

      map = {};
      for (j = i + 1; j < len; j += 1) {
        a = nums[j];
        if (map[-target - a] !== undefined) {
          result[`${target}${-target - a}`] = [target, -target - a, a];
        }
        map[a] = j;
      }
    }
    let res = [];
    Object.keys(result).map(key => res.unshift(result[key]));
    return res;
  }

  threeSum2(nums) {
    let l, r, target, result;
    result = [];
    nums = nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i += 1) {
      target = -nums[i];
      l = i + 1;
      r = nums.length - 1;
      while (l < r) {
        if (nums[l] + nums[r] > target) {
          r -= 1;
        } else if (nums[l] + nums[r] < target) {
          l += 1;
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
      // 加速， 去重复
      while (i < nums.length - 2 && nums[i] === nums[i + 1]) {
        i += 1;
      }
    }
    return result;
  }

  /**
   * leetcode
   * 169. 求众数
   * @param {*} nums
   */
  majorityElement(nums) {
    let map = {},
      key;
    for (let i = 0; i < nums.length; i += 1) {
      key = nums[i];
      if (map[key]) {
        map[key] += 1;
      } else {
        map[key] = 1;
      }
    }
    return Object.keys(map).find(key => map[key] > nums.length / 2);
  }

  /**
   * @param {number[]} nums
   * @return {number}
   */
  majorityElement2(nums) {
    nums = nums.sort((a, b) => a - b);
    let count = 0;
    let res = nums[0];
    for (let i = 0; i < nums.length; i += 1) {
      if (res === nums[i]) {
        count += 1;
        if (count > nums.length / 2) {
          break;
        }
      } else {
        res = nums[i];
        count = 1;
      }
    }
    return res;
  }

  /**
   * 摩尔投票算法
   *
   * @param {number[]} nums
   * @return {number}
   */
  majorityElement3(nums) {
    let count = 0;
    let result = nums[0];
    for (let n of nums) {
      if (n === result) {
        count += 1;
      } else {
        count -= 1;
        if (count === 0) {
          result = n;
          count = 1;
        }
      }
    }
    return result;
  }
}

var s = new Solution();

const res = s.majorityElement3([3, 3, 4]);
console.log(res);
