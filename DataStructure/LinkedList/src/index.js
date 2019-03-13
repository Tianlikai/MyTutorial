const LinkedList = require("./LinkedList");
const QLinkedList = require("./question");

var link = new LinkedList();
var solution = new QLinkedList();

link.insert("2", "1");
link.insert("3", "2");
link.insert("4", "3");
link.insert("5", "4");

var head = link.getHead();

const pointer = solution.reverseBetween(head, 2, 4);

LinkedList.display(pointer);
