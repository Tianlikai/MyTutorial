/**
 * 成对交换节点
 * @param {*} head 头指针
 */
function swapNodesInPair(head) {
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
 * 递归也可以实现
 * @param {*} head
 */
function swapNodesInPair2(head) {}

module.exports = swapNodesInPair;
