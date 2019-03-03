const ListNode = require("./Node");

/**
 * leetcode 链表类题目
 */
class QLinkedList {
  /**
   * 反向链表
   * @param {*} head 输入头节点
   */
  reverseList(head) {
    let previous = null,
      current = head,
      next;
    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    return previous;
  }

  /**
   * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转
   * 1 ≤ m ≤ n ≤ 链表长度
   * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
   * 输出: 1->4->3->2->5->NULL
   */
  reverseBetween(head, m, n) {
    if (m == n) return head;
    let root = new ListNode(0);
    root.next = head;
    let i = 0,
      next,
      current = root,
      beforeReversed = null, // 反转链表的前一项
      previous = null, // 反转链表的第一项
      endReversed = null; // 被反转链表段的最后一项

    while (i < m - 1) {
      current = current.next;
      i += 1;
    }

    beforeReversed = current;
    endReversed = current.next; // 此时 current.next 为反转链表的第一项，反转后为发转链表的最后一项

    current = current.next;
    i += 1;

    while (i <= n) {
      // 反转逻辑
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
      i += 1;
    }

    beforeReversed.next = previous;
    endReversed.next = current;

    return root.next;
  }

  /**
   * 成对交换节点
   * @param {*} head 头指针
   */
  swapNodesInPair(head) {
    if (!head || !head.next) return head;
    var previous = head;
    var root = head;

    while (previous.next && previous.next.next) {
      var a = previous.next;
      var b = a.next;

      var next = b.next;
      b.next = a;
      a.next = next;
      previous.next = b;

      previous = a;
    }

    return root.next;
  }
}

module.exports = QLinkedList;
