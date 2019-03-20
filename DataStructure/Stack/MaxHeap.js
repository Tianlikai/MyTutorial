function Heap(data) {
  if (!(data instanceof Array)) {
    throw new TypeError("data 应该是一个数组");
  }
  this.data = [];
  for (let i = 0; i < data.length; i += 1) {
    this.data.push(data[i]);
  }
}

Heap.prototype.print = function() {
  console.log("Heap: " + this.data);
};

/**
 * 堆的调整
 *
 * 运用删堆的策略进行调整
 * @param {*} data
 */
Heap.prototype.build = function(data) {};

Heap.prototype.insert = function(val) {
  this.data.push(val);
  if (this.data.length === 1) return 0;

  let P = this.data.length - 1;
  let parent = parseInt((P - 1) / 2);

  while (P > 0 && val > this.data[parent]) {
    this.data[P] = this.data[parent];
    P = parent;
    parent = parseInt((P - 1) / 2);
  }

  this.data[P] = val;
  return P;
};

Heap.prototype.delete = function() {
  if (!this.data.length) return new TypeError("栈为空");
  if (this.data.length === 1) return this.data.pop();
  let max, parent, child, childSibling, temp;
  max = this.data[0];
  temp = this.data.pop();

  parent = 0;
  child = (parent + 1) * 2 - 1;
  childSibling = child + 1;

  while (child < this.data.length) {
    if (
      childSibling < this.data.length &&
      this.data[childSibling] > this.data[child]
    ) {
      child = childSibling;
    }
    if (temp < this.data[child]) {
      this.data[parent] = this.data[child];
    } else {
      break;
    }

    parent = child;
    child = (parent + 1) * 2 - 1;
    childSibling = child + 1;
  }
  this.data[parent] = temp;
  return max;
};

const arr = [9];
const maxHeap = new Heap(arr);
// maxHeap.build();

const max = maxHeap.delete();
maxHeap.print();
