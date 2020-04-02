/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
  const [map, set] = [{}, new Set()];
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (map[n]) {
      set.delete(n);
    } else {
      map[n] = 1;
      set.add(n);
    }
  }
  return [...set];
};
