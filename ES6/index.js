const arr = [
  {
    name: "jason",
    info: {
      age: 24
    }
  },
  2,
  3,
  4
];

const arr1 = Array.from(arr);
const arr2 = [...arr];
const arr3 = arr.slice();

arr1[0].info.age = 25;
arr1[1] = "tom";

console.log(arr);
console.log(arr1);
console.log(arr2);
console.log(arr3);

var a = [1, 2, 3, 4];
console.log(Object.keys(a));
