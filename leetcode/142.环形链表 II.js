/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  const s = new Set();
  while (head) {
    if (s.has(head)) return head;
    s.add(head);
    head = head.next;
  }
  return null;
};
// @lc code=end

/**
 * 双指针
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next && fast.next.next) {
    if (slow === fast) {
      break;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  fast = head;
  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return fast;
};
