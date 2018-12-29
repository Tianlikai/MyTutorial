/**
 * 通过闭包缓存数据
 * 通过暴露接口 操作闭包数据
 */
var greeting = (function(){
    var module = {}
    var data = {
        name: 'jason'
    }
    module.sayHi = function(key) {
        return data[key]
    }
    module.setData = function(key, value) {
        return data[key] = value
    }
    return module
}())
console.log(greeting.setData('name', '田力凯'))
console.log(greeting.sayHi('name'))

/**
 * js模块化进程 重要点
 * 1 引入命名空间 解决命名冲突问题 （问题：业务和数据耦合）
 * 2 iife模式 通过立即执行函数结合闭包分离业务和数据
 * 3 模版定义依赖
 * 4 注释定义依赖
 * 5 依赖注入（angular.js)
 * 6 common.js （node.js 同步加载模块）
 * 7 amd规范（异步加载模块）（你不知道的js上卷中有实现）
 */