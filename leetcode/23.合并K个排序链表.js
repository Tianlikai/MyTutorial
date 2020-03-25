/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个排序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  const mergeList = (leftList, rightList) => {
    const result = new ListNode();
    let p = result;
    while (leftList && rightList) {
      if (leftList.val <= rightList.val) {
        p.next = leftList;
        leftList = leftList.next;
      } else {
        p.next = rightList;
        rightList = rightList.next;
      }
      p = p.next;
    }
    p.next = leftList ? leftList : rightList;
    return result.next;
  };

  const mergeSort = node => {
    if (!node || !node.next) return node;
    let mid = node,
      fast = node;
    while (fast && fast.next && fast.next.next) {
      mid = mid.next;
      fast = fast.next.next;
    }
    // 右边子序列
    const rightList = mid.next;
    // 切换序列，node -> mid 为左边子序列
    mid.next = null;
    return mergeList(mergeSort(node), mergeSort(rightList));
  };

  merge_array_loop = (array, LS, RE) => {
    if (LS < RE) {
      const center = Math.floor((RE + LS) / 2);
      const l = merge_array_loop(array, LS, center);
      const r = merge_array_loop(array, center + 1, RE);
      return mergeList(mergeSort(l), mergeSort(r));
    } else {
      return array[LS];
    }
  };
  return lists.length > 0 ? merge_array_loop(lists, 0, lists.length - 1) : null;
};
// @lc code=end
