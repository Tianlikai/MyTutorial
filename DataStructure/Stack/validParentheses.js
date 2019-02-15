/**
 * 验证有效字符串
 */
function validParentheses(s) {
  var stack = [],
    tem = { ")": "(", "]": "[", "}": "{" };
  for (const c of s) {
    if (!(c in tem)) {
      stack.push(c);
    } else if (!stack.length || tem[c] !== stack.pop()) {
      return false;
    }
  }
  return stack.length === 0;
}

let res = validParentheses("[]");
console.log(res);
