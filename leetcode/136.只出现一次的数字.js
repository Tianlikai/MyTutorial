/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  const [map, set, n] = [{}, []];
  for (let i = 0; i < nums.length; i++) {
    n = nums[i];
    if (map[n]) {
      set.delete(n);
    } else {
      map[n] = 1;
      set.add(n);
    }
  }
  return [...set][0];
};

/**
 * 任何数和0进行异或运算，得到本身
 * 任何数和自己进行异或运算，得到0
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber2 = function(nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result = nums[i] ^ result;
  }
  return result;
};
