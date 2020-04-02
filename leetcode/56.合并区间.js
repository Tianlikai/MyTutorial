/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  if (intervals.length === 0) return intervals;
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  result.push(
    intervals.reduce((acc, cur) => {
      if (acc[1] >= cur[0]) {
        if (acc[1] < cur[1]) acc[1] = cur[1];
        return acc;
      } else {
        result.push(acc);
        return cur;
      }
    })
  );
  return result;
};

merge([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18]
]);
