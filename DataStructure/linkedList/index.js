function Node(element) {
  this.element = element;
  this.next = null;
}

function LinkedList() {
  this.head = new Node("head");
}

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
