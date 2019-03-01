class Palindrome {
  /**
   * 方法一
   * 入栈，再出栈
   * @param {*} s
   */
  isPalindrome(s) {
    if (s.length <= 0) return true;
    let s1 = s.replace(/[^0-9a-zA-Z]/g, "").toLocaleLowerCase();
    let s2 = "",
      arr = Array.from(s1);
    while (arr.length) {
      s2 += arr.pop();
    }
    return s1 === s2;
  }

  /**
   * 方法二
   * 往中间移动比较
   */
  isPalindrome2(s) {
    if (s.length <= 0) return true;
    const newS = s.replace(/[^0-9a-zA-Z]/g, "").toLocaleLowerCase();
    let i = 0,
      l = newS.length;
    while (i < l / 2) {
      if (newS[i] !== newS[l - 1 - i]) return false;
      i += 1;
    }
    return true;
  }
}

const p = new Palindrome();

const str = "A man, a plan, a canal: Panama";
const result = p.isPalindrome2(str);
console.log(result);
