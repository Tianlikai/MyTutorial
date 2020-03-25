/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  const s = new Set();
  while (headA) {
    s.add(headA);
    headA = headA.next;
  }
  while (headB) {
    if (s.has(headB)) return headB;
    headB = headB.next;
  }
  return null;
};
// @lc code=end
