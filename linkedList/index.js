/**
 * js 链表实现
 * 首先建立节点类，包含节点信息和下一个节点信息
 * 建立LList，初始化时建立头节点，next为空
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LList {
  constructor() {
    this.head = new Node("head");
  }
  /**
   * 找到要插入什么元素的后面
   * @param {*} ele
   */
  find(ele) {
    let currentNode = this.head;
    while (currentNode.element != ele) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  /**
   * 后插
   * @param {*} newEle
   * @param {*} ele
   */
  insert(newEle, ele) {
    let newNode = new Node(newEle);
    let currentNode = this.find(ele);
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }
  /**
   * 找到要删除元素的前面
   * @param {*} ele
   */
  findPre(ele) {
    let currentNode = this.head;
    while (!(currentNode.next != null) && currentNode.next.element != ele) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  /**
   * 前删
   * @param {*} ele
   */
  remove(ele) {
    let preNode = this.findPre(ele);
    if (preNode.next != null) {
      preNode.next = preNode.next.next;
    }
  }
  /**
   * 打印
   */
  display() {
    let currentNode = this.head;
    while (currentNode.next != null) {
      console.log(currentNode.next.element);
      currentNode = currentNode.next;
    }
  }
}

const L = new LList();
L.insert("jason", "head");
L.insert("bob", "head");
L.insert("jack", "bob");
L.insert("tom", "jack");
L.remove("jack");
L.display();

console.log(a)