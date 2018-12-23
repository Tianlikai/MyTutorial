/**
 * 问题
 * const a = [1, 2, 3, 4, 5];
 * a.multiply()
 * a = [1, 2, 3, 4, 5, 1, 4, 9, 16, 25];
 */

const a = [1, 2, 3, 4, 5];

if (!Object.prototype.multiply) {
  Object.prototype.multiply = function() {
    let ipt = this;
    if (!ipt) throw new Error("输入不能为 null 或 undefined");
    const type = Object.prototype.toString.call(ipt);
    if (type !== "[object Array]") throw new Error("类型错误");
    if (ipt.length === 0) return [];
    const copy = ipt.slice();
    copy.forEach(element => {
      ipt.push(element * element);
    });
  };
}

a.multiply();

console.log(a);
