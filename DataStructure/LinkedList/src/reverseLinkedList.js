/**
 * 反向链表
 * @param {*} head 输入头节点
 */
function reverseList(head) {
  var previous = null;
  var current = head;

  while (current) {
    const next = current.next;

    // 当前节点的下一个点指向前一个点
    current.next = previous;
    // 前一个点移向当前点
    previous = current; // 更新 previous 缓存

    current = next;
  }

  return previous;
}

module.exports = reverseList;
/**
 * 方式
 * previous = current -> current.next => previous(上一次循环缓存的 current) = current -> current.next
 */
