/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome1 = function(x) {
    let str = `${x}`
    if (!str || str.length === 1) return true;
    return str === str.split('').reverse().join('')
};

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let str = `${x}`
    let i = 0;
    let j = str.length - 1;
    while(i <= j) {
        if (str.charAt(i) !== str.charAt(j)) return false;
        i += 1;
        j -= 1;
    }
    return true;
};