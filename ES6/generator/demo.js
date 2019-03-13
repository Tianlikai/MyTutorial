const axios = require('axios')
const co = require('./co')

function foo(){ // 返回一个 promise
    return axios.get('https://www.baidu.com')
}

function * main(){
    try {
        var value = yield foo()
        return value.a()
    } catch (error) {
        return error
    }
}

const p = co(main)

p.then(
    function(data){
        console.log(data)
    },
    function(error){
        console.log(error)
    }
)  