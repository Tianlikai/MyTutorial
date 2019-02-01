const LinkedList = require("./LinkedList");
const reverseLinkedList = require("./reverseLinkedList");
const swapNodesInPair = require("./swapNodesInPair");

var link = new LinkedList();

link.insert("1", "head");
link.insert("2", "1");
link.insert("3", "2");
link.insert("4", "3");

var head = link.getHead();

/**
 * 链表反转测试
 */
// let result = reverseLinkedList(head);
// LinkedList.display(result);

/**
 * 链表两两交换测试
 */

let result2 = swapNodesInPair(head);
LinkedList.display(result2);
