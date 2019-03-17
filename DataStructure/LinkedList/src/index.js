const LinkedList = require("./LinkedList");
const QLinkedList = require("./question");

var link = new LinkedList();
var solution = new QLinkedList();

link.insert("0", "1");
link.insert("0", "0");
link.insert("1", "0");

var head = link.getHead();

const result = solution.isPalindrome2(head);
console.log(result);

LinkedList.display(head);
