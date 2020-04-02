const { type } = require("./type");

function deepClone(data) {
  const [root, set] = [{}, new Set()];
  const stack = [
    {
      parent: root,
      key: undefined,
      value: data
    }
  ];
  while (stack.length) {
    const { parent, key, value } = stack.pop();
    let result = typeof key === "undefined" ? parent : (parent[key] = {});
    if (set.has(value)) {
      parent[key] = value;
      continue;
    }
    set.add(value);
    for (let k of value) {
      if (value.hasOwnProperty(k)) {
        if (type(value[k]) === "object") {
          stack.push({
            parent: result,
            key: k,
            value: value[k]
          });
        } else {
          result[key] = value[key];
        }
      }
    }
  }
  return root;
}
