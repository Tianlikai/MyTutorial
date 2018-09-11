/**
 * 类属性
 * 获取类的实际类型
 * @param {*} o
 */
function classOf(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}
console.log(classOf(""));
