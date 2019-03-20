import Heap from "../Stack/MinHeap";

/**
 * leetcode 703
 *
 * @param {*} k
 * @param {*} nums
 */
var KthLargest = function(k, nums) {
  nums = nums.sort((a, b) => a - b);
  this.k = k;
  this.kGroup =
    this.k > nums.length ? new Heap(nums) : new Heap(nums.slice(-this.k));
};

KthLargest.prototype.add = function(val) {
  if (this.kGroup.data.length < this.k) {
    this.kGroup.insert(val);
  } else if (val > this.kGroup.data[0]) {
    this.kGroup.delete();
    this.kGroup.insert(val);
  }
  return this.kGroup.data[0];
};
