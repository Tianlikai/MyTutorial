/**
 * 顺序查找
 * @return {num: 返回指定元素的下标} 
 */
function sequentialSearch(arr, target) {
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] === target) return i
    }
    throw new Error('not found')
}