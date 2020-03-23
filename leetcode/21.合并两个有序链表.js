/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if (!l1 && !l2) return l1;
  const array = [];
  while (l1 && l2) {
    if (l1.val < l2.val) {
      array.push(l1.val);
      l1 = l1.next;
    } else if (l1.val > l2.val) {
      array.push(l2.val);
      l2 = l2.next;
    } else {
      array.push(l1.val, l2.val);
      l1 = l1.next;
      l2 = l2.next;
    }
  }
  while (l1) {
    array.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    array.push(l2.val);
    l2 = l2.next;
  }
  const l = { val: array[0] };
  let temp = l;
  for (let i = 1; i < array.length; i += 1) {
    temp.next = {
      val: array[i]
    };
    temp = temp.next;
  }
  return l;
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists2 = function(l1, l2) {
  let p = new ListNode(null);
  const head = p;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      p.next = l2;
      l2 = l2.next;
    }
    p = p.next;
  }
  p.next = l1 ? l1 : l2;
  return head.next;
};
