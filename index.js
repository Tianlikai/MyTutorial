/**
 * 请把两个数组
 * ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']
 * 合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
 */
const array1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
const array2 = ["A", "B", "C", "D"];
Array.prototype.concat2 = function(array) {
  return this.reduce((acc, cur) => {
    array.forEach(element => {
      if (element.startsWith(cur)) {
        acc.push(element);
      }
    });
    return acc.concat(cur);
  }, []);
};
// const result1 = array2.concat2(array1);
// console.log("test1");
// console.log(result1);

var b = 10;
// (function b() {
//   b = 20;
//   console.log(b);
// })();

/**
 * var a = ?;
 * if(a == 1 && a == 2 && a == 3){
 * console.log(1);
 * }
 * a 等于多少会打印出1
 *
 * == 会进行隐式转换，所以执行toString即可
 */
// let a = [1, 2, 3];
// a.toString = a.shift;
// if (a == 1 && a == 2 && a == 3) {
//   console.log(1);
// }

// var c = 10;
// (function() {
//   console.log(c);
//   c = 5;
//   // console.log(window.c);
//   var c = 20;
//   console.log(c);
// })();

/**
 *  如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
 */
const reverseStringWord = string => {
  const d = {
    a: "A",
    b: "B",
    c: "C",
    A: "a",
    B: "b",
    C: "c"
  };
  let result = "";
  for (let s of string) {
    result += s === d[s] ? s : d[s];
  }
  return result;
};

/**
 * 打印出 1 - 10000 之间的所有对称数
 */
const isPalindrome = number => {
  const string = "" + number;
  let i = 0;
  let j = string.length - 1;
  while (i !== j && i < j) {
    if (string[i] !== string[j]) return false;
    i++;
    j--;
  }
  return true;
};
const findPalindromeFrom1To10000 = () => {
  for (let i = 1; i < 10000; i += 1) {
    if (isPalindrome(i)) console.log(i);
  }
};
findPalindromeFrom1To10000();
