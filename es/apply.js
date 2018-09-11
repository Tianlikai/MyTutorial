// 原声 apply 函数
Function.prototype.myApply = function(context, arr) {
    var context = context || window
    context.fn = this
    var result
    if (!arr) {
        result = context.fn()
    } else {
        var args = []
        for (var i = 1, len = arr.length; i < len; ++i) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result
}
