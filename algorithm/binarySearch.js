/**
 * 二分法查找，也称折半查找，是一种在有序数组中查找特定元素的搜索算法。
 * 查找过程可以分为以下步骤：
 *（1）首先，从有序数组的中间的元素开始搜索，如果该元素正好是目标元素（即要查找的元素），则搜索过程结束，否则进行下一步。
 *（2）如果目标元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半区域查找，然后重复第一步的操作。
 *（3）如果某一步数组为空，则表示找不到目标元素。
 */

/**
 * 二分排序递归实现
 * 递归 一定要return 结果依次返回
 * @param {arr: 目标数组} arr
 * @param {num: 下限} low
 * @param {num: 上限} high
 * @param {num: 查找数值} key  
 */
function binarySearch_Recursive(arr, low, high, key) { // 递归实现
    if (low > high) return 'not found'
    let middle = parseInt((high + low)/2)
    let value = arr[middle]
    if (value === key) {
        return `the position is ${middle}`
    } else if (value > key) {
        high = middle - 1
        return binarySearch_Recursive(arr, low, high, key)
    } else if(value < key) {
        low = middle + 1
        return binarySearch_Recursive(arr, low, high, key)
    }
}

/**
 * 非递归实现
 */
function binarySearch(arr, key) {
    let low = 0
    let high = arr.length - 1
    while (low <= high) {
        let middle = parseInt((high - low) / 2)
        let value = arr[middle]
        if (value === key) {
            return `the position is ${middle}`
        } else if (value > key) {
            high = middle - 1
        } else if (value < key) {
            low = middle + 1
        }
    }
    return 'not found !'
}
// test
// var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,86]
let arr = []
for (var i = 0; i < 10; ++i) arr.push(i)
var low = 0
var high = arr.length - 1
var target = 1
// var result = binarySearch_Recursive(arr, low, high, target)
var result = binarySearch(arr, target)
console.log(result)










































