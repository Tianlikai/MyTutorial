const { dataGenerator } = require("./data");
const { bubble_sort1, bubble_sort2 } = require("./bubble_sort");
const {
  intersection_sort,
  intersection_sort2
} = require("./intersection_sort");
const { shell_sort } = require("./shell_sort");
const { selection_sort } = require("./selection_sort");
const { merge_sort1, merge_sort2 } = require("./merge_sort");
const { quick_sort1, quick_sort2 } = require("./quick_sort");

const data = dataGenerator(20);
// const data = [3, 1, 5, 8, 2];
console.log("前: ", data);

// const result1 = bubble_sort1(data);
// const result2 = bubble_sort2(data);
// intersection_sort(data);
// intersection_sort2(data, 0, data.length - 1);
// const result4 = shell_sort(data);
// const result5 = selection_sort(data);
// merge_sort1(data, new Array(data.length - 1), 0, data.length - 1);
// merge_sort2(data, new Array(data.length - 1), 0, data.length - 1);
quick_sort2(data, 0, data.length - 1);
console.log("后: ", data);
