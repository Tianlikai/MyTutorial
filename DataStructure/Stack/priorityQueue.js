class PriorityQueue {
  constructor({ comparator = (a, b) => a - b, initialValues = [] } = {}) {
    this.comparator = comparator;
    this.data = initialValues;
    this.heapIfy();
  }

  peek() {
    if (this.size() === 0) {
      return null;
    }

    return this.data[0];
  }

  offer(value) {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  poll() {
    if (this.size() === 0) {
      return null;
    }

    const result = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return result;
  }

  clear() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  toArray() {
    return this.data.slice(0).sort(this.comparator);
  }

  heapIfy() {
    if (this.data.length > 0) {
      for (let i = 1; i < this.data.length; i++) {
        this.bubbleUp(i);
      }
    }
  }

  bubbleUp(pos) {
    while (pos > 0) {
      let parent = (pos - 1) >>> 1;

      if (this.comparator(this.data[pos], this.data[parent]) < 0) {
        const temp = this.data[parent];
        this.data[parent] = this.data[pos];
        this.data[pos] = temp;
        pos = parent;
      } else {
        break;
      }
    }
  }

  bubbleDown(pos) {
    const last = this.data.length - 1;

    while (true) {
      let left = (pos << 1) + 1;
      let right = left + 1;
      let minIndex = pos;

      if (
        left <= last &&
        this.comparator(this.data[left], this.data[minIndex]) < 0
      ) {
        minIndex = left;
      }

      if (
        right <= last &&
        this.comparator(this.data[right], this.data[minIndex]) < 0
      ) {
        minIndex = right;
      }

      if (minIndex !== pos) {
        const temp = this.data[minIndex];
        this.data[minIndex] = this.data[pos];
        this.data[pos] = temp;
        pos = minIndex;
      } else {
        break;
      }
    }
  }
}

var KthLargest = function(k, nums) {
  this.priorityQueue = new PriorityQueue({ initialValues: nums });
  this.k = k;

  while (this.priorityQueue.size() > this.k) {
    this.priorityQueue.poll();
  }
};

KthLargest.prototype.print = function() {
  console.log(this.priorityQueue.data);
};

var ins = new KthLargest(3, [4, 5, 8, 2]);
ins.print();

console.log(3 >>> 1);
