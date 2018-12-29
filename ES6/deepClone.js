/**
 * 深拷贝 数组的两种方法
 * 1 let copy = Array.from(arr)
 * 2 let copy = [...arr]
 */

 /**
  * 深拷贝实现方式
  * 1 JSON.stringify -》 JSON.parse
  * 2 递归拷贝
  * 3 Object.create()
  * ！注意式项目
  * 防止相互引用 陷入递归死循环
  */

/**
 * 2 递归拷贝
 */
function deepClone(old, target) {
    let copy = target || {}
    for (let key in old) {
        let oldObj = old[key]
        if (oldObj === copy) continue
        if (typeof oldObj === 'object') {
            copy[key] = oldObj.constructor === Array ? [] : {}
            deepClone(oldObj, copy[key])
        } else {
            copy[key] = oldObj
        }
    }
    return copy
}

function deepClone2(old, target){
    let copy = target || {}
    for (let key in old) {
        let oldObj = old[key]
        if (oldObj === copy) continue
        if (typeof oldObj === 'object') {
            copy[key] = oldObj.constructor === Array ? [] : Object.create(oldObj)
            deepClone2(oldObj, copy[key])
        } else {
            copy[key] = oldObj
        }
    }
    return copy
}

// test 
let a= {
    name: '鹏哥',
    age: 18,
    arr1: [1, 2, 3, 4, 5],
    string: 'afasfsafa',
    arr2: [1, 2, 3, 4, 5],
    arr3: [
        {
            name1: "李鹏"
        },
        {
            job: "前端开发"
        }
    ]
}
let copy = deepClone2(a)
a.name = 'jason'
a.arr3[0].name1 = '田力凯'
console.log(a)
console.log(copy)
