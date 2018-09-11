const CArray = require("./CArray");

const bubbleSort = data => {
  if (!Array.isArray(data) || data.length === 0) return data;
  const length = data.length;
  for (let outer = length; outer >= 2; --outer) {
    for (let inner = 0; inner < outer - 1; ++inner) {
      if (data[inner] > data[inner + 1]) {
        let temp = data[inner + 1];
        data[inner + 1] = data[inner];
        data[inner] = temp;
      }
    }
  }
  return data;
};

// 测试
const obj = new CArray(100);
const data = obj.getData();

const cd = data.slice();

const res = bubbleSort(cd);
console.log(data.toString());
console.log("----------------");
console.log(res.toString());
