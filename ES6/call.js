/**
 * 源生call函数
 */
Function.prototype.myCall = function(context) {
    var context = context || window
    context.fn = this
    var args = []
    for (var i = 1, len = arguments.length; i < len; ++i) {
        args.push('arguments[' + i + ']')
    }
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}

// 实现方式
// a = {value : 1}
// 为a添加一个函数 fn 此时fn的上下文为a
// 试用完毕fn函数后，删除即可

function foo (name, age) {
    console.log(this.value)
    return {
        value: this.value,
        name: name,
        age: age
    }
}

var a = {
    value: 1
}

var result = foo.myCall(a, 'jason', '22')
console.log(result)

