class Solution {
  /**
   * leetcode 349. 两个数组的交集
   *
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  intersection1(nums1, nums2) {
    let result = [];
    let len, longer, short;
    if (nums1.length > nums2.length) {
      len = nums2.length;
      longer = nums1;
      short = nums2;
    } else {
      len = nums1.length;
      longer = nums2;
      short = nums1;
    }
    for (let i = 0; i < len; i += 1) {
      if (longer.includes(short[i]) && !result.includes(short[i])) {
        result.push(short[i]);
      }
    }
    return result;
  }

  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  intersection2(nums1, nums2) {
    // 类型判断忽略
    if ((nums1.length && !nums2.length) || (nums2.length && !nums1.length)) {
      return [];
    }

    let result = [];
    let map = {};

    nums1.forEach(item => (map[item] = 1));
    nums2.forEach(item => {
      if (map[item] && !result.includes(item)) {
        result.push(item);
      }
    });

    return result;
  }

  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  intersection3(nums1, nums2) {
    // 类型判断忽略
    if ((nums1.length && !nums2.length) || (nums2.length && !nums1.length)) {
      return [];
    }

    let result = [];
    nums1.forEach(item => {
      if (!result.includes(item) && nums2.includes(item)) {
        result.push(item);
      }
    });

    return result;
  }

  /**
   * 350. 两个数组的交集 II
   *
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  intersect(nums1, nums2) {
    nums1 = nums1.sort((a, b) => a - b);
    nums2 = nums2.sort((a, b) => a - b);

    // 如果数据有序可以使用 归并排序
    let i = (j = 0);
    let result = [];
    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] === nums2[j]) {
        result.push(nums1[i]);
        i += 1;
        j += 1;
      } else if (nums1[i] < nums2[j]) {
        i += 1;
      } else {
        j += 1;
      }
    }
    return result;
  }
}
