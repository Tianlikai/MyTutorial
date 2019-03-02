/**
 * leetcode 链表类题目
 */
class LinkedList {
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
