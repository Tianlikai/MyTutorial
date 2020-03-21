const { dataGenerator } = require("./data");
const { bubble_sort1, bubble_sort2 } = require("./bubble_sort");
const { intersection_sort } = require("./intersection_sort");
const { shell_sort } = require("./shell_sort");
const { selection_sort } = require("./selection_sort");

const data = dataGenerator(20);
console.log("前: ", data);

// const result1 = bubble_sort1(data);
// const result2 = bubble_sort2(data);
// const result3 = intersection_sort(data);
// const result4 = shell_sort(data);
const result5 = selection_sort(data);
console.log("后: ", result5);
