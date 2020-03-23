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
