const { type } = require("./type");

function flat1(array) {
  let result = [];
  for (let i = 0; i < array.length; i += 1) {
    if (type(array[i] === "array")) {
      result = result.concat(flat1(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

const flat2 = array =>
  array.reduce((acc, cur) => {
    acc = acc.concat(tyep(cur) === "array" ? flat2(cur) : cur);
  }, []);
