function compose(...funcs) {
    if (!funcs.length) args => args
    if (funcs.length === 1) return funcs[0]
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
module.exports = compose
// 测试 
const f1 = (arg) => {
    console.log('f1: ' + arg) 
    return arg + ' 经过了f1 '
}
const f2 = (arg) => {
    console.log('f2: ' + arg) 
    return arg + ' 经过了f2 '
}
const f3 = (arg) => {
    console.log('f3: ' + arg) 
    return arg + ' 经过了f3 '
}
compose(f1, f2, f3)('输入田')
// 柯里化 返回一个函数 处理具体功能
// 结合 reduce函数 接受一个初始化参数 每次返回值作为下一个函数的输入
// reduce 接收三个参数 1: 上一次的结果 2: 当前值 3: 整个数组

let date = new Date().toLocaleString()
console.log(date)
