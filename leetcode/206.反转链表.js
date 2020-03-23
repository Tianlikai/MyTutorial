/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
var reverseList = function(head) {
  let preHead = null;
  let cur = head;
  let next;
  while (cur) {
    next = cur.next;
    cur.next = preHead;
    preHead = cur;
    cur = next;
  }
  return preHead;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (!head || !head.next) return head;
  const lastNode = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return lastNode;
};
// @lc code=end
