class MinHeap {
  constructor({ comparison = (a, b) => a - b, initVal = [] } = {}) {
    this.comparison = comparison;
    this.data = initVal;
  }

  print() {
    console.log(this.data);
  }

  size() {
    return this.data.length;
  }

  peek() {
    if (this.size() === 0) {
      return null;
    }
    return this.data[0];
  }

  clear() {
    this.data = [];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  insert(val) {
    this.data.push(val);
    let size = this.size();
    if (size === 1) return 0;
    let child = size - 1;
    let parent = (child - 1) >>> 1;

    while (child > 0 && val < this.data[parent]) {
      this.data[child] = this.data[parent];
      child = parent;
      parent = (child - 1) >>> 1;
    }

    this.data[child] = val;
    return child;
  }

  delete() {
    let size = this.size();
    if (!size) return new TypeError("栈为空");
    if (size === 1) return this.data.pop();
    let parent, child, childSibling, temp;

    temp = this.data.pop();
    size = this.size();

    parent = 0;
    child = (parent + 1) * 2 - 1;
    childSibling = child + 1;

    while (child < size) {
      if (childSibling < size && this.data[childSibling] < this.data[child]) {
        child = childSibling;
      }

      if (temp > this.data[child]) {
        this.data[parent] = this.data[child];
      } else {
        break;
      }

      parent = child;
      child = (parent + 1) * 2 - 1;
      childSibling = child + 1;
    }

    this.data[parent] = temp;
    return this.peek();
  }
}

let ins = new MinHeap({ initVal: [1, 2, 3, 4, 5, 6, 7] });
ins.delete();
ins.print();
