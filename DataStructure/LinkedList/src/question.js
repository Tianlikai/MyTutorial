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

  /**
   * 给定一个链表，判断链表中是否有环。
   * 给定数组判断
   * @param {Object} head
   * @return {boolean}
   */
  hasCycleMethod1(head) {
    var arr = [];
    while (head) {
      if (arr.indexOf(head) >= 0) return true;
      arr.push(head);
      head = head.next;
    }
    return false;
  }

  /**
   * 给定一个链表，判断链表中是否有环。
   * 快慢指针
   * @param {Object} head
   * @return {boolean}
   */
  hasCycleMethod2(head) {
    var fast = (slow = head);
    while (fast && fast.next && slow) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) return true;
    }
    return false;
  }

  /**
   * 环形链表ii
   * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
   * @param {*} head
   */
  detectCycleMethod1(head) {
    var arr = [];
    while (head) {
      if (arr.indexOf(head) >= 0) return head;
      arr.push(head);
      head = head.next;
    }
    return null;
  }

  /**
   * 环形链表ii
   * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
   * 快慢指针解法
   * @param {*} head
   */
  detectCycleMethod2(head) {
    if (!head || !head.next) return null;

    var fast = (slow = head);

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
        // 快慢指针相遇时，不一定时第一个进入循环的node
        while (slow !== head) {
          slow = slow.next;
          head = head.next;
        }
        return slow;
      }
    }
    return null;
  }

  /**
   * leetcode 25
   *
   * 给出一个链表，每 k 个节点一组进行翻转，并返回翻转后的链表。
   * @param {*} head
   * @param {*} k
   */
  reverseKGroup(head, k) {}

  /**
   * leetcode 234
   * 请判断一个链表是否为回文链表。
   *
   * 方法1: 入栈，出栈相互比较
   * @param {*} head
   */
  isPalindrome1(head) {
    // 空间复杂度 o(n)
    var stack = [];
    let temp = head;
    while (temp) {
      stack.push(temp.element);
      temp = temp.next;
    }
    temp = head;
    while (temp) {
      if (temp.element !== stack.pop()) return false;
      temp = temp.next;
    }
    return true;
  }

  /**
   * 方法2
   * @param {*} head
   */
  isPalindrome2(head) {
    let fast = head,
      slow = head,
      list1 = head,
      list2,
      pre = null,
      next;
    // 找链表中点
    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    }

    // 反转后半段链表
    while (slow) {
      next = slow.next;
      slow.next = pre;
      pre = slow;
      slow = next;
    }

    list2 = pre.next;
    // 比较前后链表
    while (list2) {
      if (list1.element !== list2.element) return false;
      list1 = list1.next;
      list2 = list2.next;
    }
    return true;
  }
}

// [1,0,1]

module.exports = QLinkedList;
