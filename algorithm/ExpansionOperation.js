/**
 * 展开运算符运用
 */
const arr3 = [1, 2, 3];
const arr4 = [4, 5, 6];
console.log([].concat(arr3).concat(arr4));
console.log([...arr3, ...arr4]);

const arr = [1, 2, 3, 4, 5, 6];
const max = Math.max(...arr);
console.log(max);

/**
 * 展开运算符的实现
 */
const arr2 = [1, 3, 4, 5, 6, 72, 12];
const max2 = Math.max.apply(null, arr2);
console.log(max2);

/**
 * 对象的拓展
 */
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };

/**
 * 循环赋值
 */
for (let key in obj2) {
  obj1[key] = obj2[key];
}
console.log(obj2);

const obj = {
  name: "jason",
  getName: () => {
    console.log(this.name);
  }
};
obj.getName();
