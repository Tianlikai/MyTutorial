function combineReducer(reducers) {
    let reducersKeys = Object.keys(reducers)
    let finallyReducer = {}
    for (let i = 0; i < reducersKeys.length; ++i){
        let key = reducersKeys[i]
        if (typeof reducers[key] === 'function') finallyReducer[key] = reducers[key]
    }

    // reducer 合法性检验

    return function combination(state = {}, action) {
        // 检测当前环境 开发还是生产环境
        // 检测传入action类型
        // state 是否为简单对象
        // 检查 reducer 是否存在

        let nextState = {}
        let hasChanged = false
        let finallyReducerKeys = Object.keys(finallyReducer)
        for (let i = 0; i < finallyReducerKeys.length; ++i) {
            let key = finallyReducerKeys[i]
            let reducer = finallyReducer[key]
            let previousStateForKey = state[key]
            let nextStateForKey = reducer(previousStateForKey, action)
            if (nextStateForKey === 'undefined') throw new Error('error') // 检测
            nextState[key] = nextStateForKey
            hasChanged = hasChanged || nextStateForKey === previousStateForKey
        }
        return hasChanged ? nextState : state
    }
}