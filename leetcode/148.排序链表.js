/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
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
 * 快排
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  const array = [];
  while (head) {
    array.push(head.val);
    head = head.next;
  }
  array.sort(function(a, b) {
    return a - b;
  });
  const preHead = new ListNode();
  let p = preHead;
  for (let i = 0; i < array.length; i += 1) {
    p.next = new ListNode(array[i]);
    p = p.next;
  }
  return preHead.next;
};
// @lc code=end

/**
 * 归并排序
 * 递归实现
 * 1 找到链表中点
 * 2 分别归并子序列
 * 3 如何合并链表子序列
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList2 = function(head) {
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
  return mergeSort(head);
};
