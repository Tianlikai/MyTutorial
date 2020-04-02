/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s
    .trim()
    .split(/\s+/)
    .reverse()
    .join(" ");
};

const res = reverseWords("   a   b ");
console.log(res);
