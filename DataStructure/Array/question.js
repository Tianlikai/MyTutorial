/**
 * leetcode 数组类题目
 */
class QArray {
  /**
   * leetcode
   * 287. 寻找重复数
   *
   * 给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n）
   * 可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。
   *
   * 用一个数组缓存数据
   *
   * @param {Array} nums
   * @returns {number}
   */
  findDuplicate1(nums) {
    var arr = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr.indexOf(nums[i]) >= 0) return nums[i];
      arr.push(nums[i]);
    }
  }

  /**
   * 双指针
   * 分治法
   * @param {*} nums
   */
  findDuplicate2(nums) {
    var arr = [];
    for (let i = 0, j = nums.length - 1; i <= j; i += 1, j -= 1) {
      if (arr.indexOf(nums[i]) >= 0) return nums[i];
      arr.push(nums[i]);
      if (arr.indexOf(nums[j]) >= 0) return nums[j];
      arr.push(nums[j]);
    }
  }

  /**
   * hash 碰撞
   * @param {*} nums
   */
  findDuplicate3(nums) {
    var map = {};
    for (let i = 0; i < nums.length; i += 1) {
      if (map[nums[i]]) {
        return nums[i];
      } else {
        map[nums[i]] = 1;
      }
    }
  }

  /**
   * 特殊解法
   * 将数组看成链表
   * val是结点值也是下个节点的地址。因此这个问题就可以转换成判断链表有环，且找出入口节点---使用快慢指针
   * @param {*} nums
   */
  findDuplicate4(nums) {
    var fast = 0;
    var slow = 0;
    while (true) {
      fast = nums[fast];
      fast = nums[fast];
      slow = nums[slow];
      if (fast === slow) {
        slow = 0;
        while (fast !== slow) {
          fast = nums[fast];
          slow = nums[slow];
        }
        return slow;
      }
    }
  }
}

module.exports = QArray;
