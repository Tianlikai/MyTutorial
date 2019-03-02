const LinkedList = require("./LinkedList");
const QLinkedList = require("./question");

var link = new LinkedList();
var solution = new QLinkedList();

link.insert("1", "head");
link.insert("2", "1");
link.insert("3", "2");
link.insert("4", "3");

var head = link.getHead();

const pointer = solution.reverseList(head);

LinkedList.display(pointer);
