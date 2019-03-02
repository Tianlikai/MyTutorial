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
  reverseBetween(head, m, n) {}

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
