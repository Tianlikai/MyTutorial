const Node = require("./Node");

function LinkedList() {
  this.head = new Node("1");
}

LinkedList.prototype.getHead = function() {
  return this.head;
};

LinkedList.prototype.find = function(item) {
  var currentNode = this.head;
  while (currentNode.element !== item) {
    currentNode = currentNode.next;
  }
  return currentNode;
};

LinkedList.prototype.findPrevious = function(item) {
  var currentNode = this.head;
  while (currentNode.next && currentNode.next.element !== item) {
    currentNode = currentNode.next;
  }
  return currentNode;
};

LinkedList.prototype.insert = function(newElement, item) {
  var newNode = new Node(newElement);
  var currentNode = this.find(item);
  newNode.next = currentNode.next;
  currentNode.next = newNode;
};

LinkedList.prototype.delete = function(item) {
  var previousNode = this.findPrevious(item);
  if (previousNode.next) {
    previousNode.next = previousNode.next.next;
  }
};

LinkedList.prototype.display = function() {
  var currentNode = this.head;
  while (currentNode) {
    console.log(
      `element: ${currentNode.element}, next: ${
        currentNode.next ? currentNode.next.element : null
      }`
    );
    currentNode = currentNode.next;
  }
};

LinkedList.prototype.display2 = function() {
  var currentNode = this.head;
  while (currentNode) {
    console.log(currentNode.element);
    currentNode = currentNode.next;
  }
};

LinkedList.display = function(list) {
  var linkList = list;
  while (linkList) {
    console.log(
      `element: ${linkList.element}, next: ${
        linkList.next ? linkList.next.element : null
      }`
    );
    linkList = linkList.next;
  }
};

module.exports = LinkedList;
