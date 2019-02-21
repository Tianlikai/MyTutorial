var MyLinkedList = function() {
  this.list = null;
  this.size = 0;
};

var Node = function(val) {
  this.val = val;
  this.next = null;
};

MyLinkedList.prototype.get = function(index) {
  let p = this.list;
  if (index >= this.size) {
    return -1;
  }
  for (var i = 0; i < index; i++) {
    p = p.next;
  }
  return p.val;
};

MyLinkedList.prototype.addAtHead = function(val) {
  let node = new LinkedNode(val);
  let head = this.list;
  node.next = head;
  this.list = node;
  this.size++;
};

MyLinkedList.prototype.addAtTail = function(val) {
  let node = new LinkedNode(val);
  let p = this.list;
  if (!p) {
    this.list = node;
  } else {
    while (p.next) {
      p = p.next;
    }
    p.next = node;
  }
  this.size++;
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
  let node = new LinkedNode(val);
  if (index > this.size) {
    return;
  }
  let p = this.list;
  if (index == 0) {
    node.next = this.list;
    this.list = node;
  } else {
    for (var i = 0; i < index - 1; i++) {
      p = p.next;
    }
    if (p.next) {
      node.next = p.next;
    }

    p.next = node;
  }
  this.size++;
};

MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index >= this.size) return;
  if (index == 0) {
    if (this.list != null) {
      this.list = this.list.next;
    }
  } else {
    let p = this.list;
    for (var i = 0; i < index - 1; i++) {
      p = p.next;
    }
    p.next = p.next.next;
  }
  this.size--;
};
