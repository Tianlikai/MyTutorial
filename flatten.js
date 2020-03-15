const type = require("./type");

/**
 * 循环，递归
 * @param {*} array
 */
const flattenByLoop = array => {
  let result = [];
  for (let i = 0; i < array.length; i += 1) {
    if (type(array[i]) === "Array") {
      result = result.concat(flattenByLoop(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
};

/**
 * 通过reduce的特性
 * reduce函数的第一个参数是上一步操作的返回
 * @param {*} array
 */
const flattenByReduce = array =>
  array.reduce(
    (acc, cur) =>
      acc.concat(type(cur) === "Array" ? flattenByReduce(cur) : cur),
    []
  );

const testData = [1, [2, [3, 4, [5, [6, 7, [8, [9, [[12], 10], 11]]]]]]];
const result1 = flattenByLoop(testData);
console.log(`test1:`);
console.log(result1);
const result2 = flattenByReduce(testData);
console.log(`test2:`);
console.log(result2);

/**
 * 已知如下数组：
 * var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */
const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10
];
const flattenUniqueSort = () => {
  const exitsArray = [];
  const uniqueSort = (array = []) => {
    return array.reduce((acc, cur) => {
      if (type(cur) === "Array") {
        return acc.concat(uniqueSort(cur));
      } else if (exitsArray.indexOf(cur) < 0) {
        exitsArray.push(cur);
        return acc.concat(cur);
      }
      return acc;
    }, []);
  };
  return array => uniqueSort(array).sort((a, b) => a - b);
};

const result3 = flattenUniqueSort()(arr);
console.log("test3:");
console.log(result3);
