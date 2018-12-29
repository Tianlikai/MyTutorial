const insertionSort = data => {
  let len = data.length;
  for (let outer = 1; outer < len; ++outer) {
    let max = data[outer];
    let inner = outer;
    while (inner > 0 && data[inner - 1] >= max) {
      let temp = data[inner];
      data[inner] = data[inner - 1];
      data[inner - 1] = temp;
      --inner;
    }
    data[inner] = max;
  }
  return data;
};

let data = [1, 3, 5, 2, 6, 4, 8, 7, 9];

console.log(insertionSort(data));
