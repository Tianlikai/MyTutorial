function createStore(reducer, initialState, enhancer) {
    // 参数检测 
    // 是否有增强器
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
        enhancer = initialState
        initialState = undefined
    }

    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('expected the enhancer to be a function')
        }

        return enhancer(createStore)(reducer, initialState)
    }

    if (typeof reducer !== 'function') {
        throw new Error('expected the enhancer to be a function')
    }

    let currentReducer = reducer
    let currentState = preloadedState
    let currentListeners = []
    let nextListeners = currentListeners
    let isDispatching = false

    // 订阅函数的新增和取消都在 副本中进行 保证订阅函数全部都执行
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }

    // 获取闭包内所有的状态
    function getState() {
        if (isDispatching) {
            throw new Error('reducer 还没有执行完毕 state不是最新结果')
        }
        return currentState
    }

    // 一次调用所有的订阅函数 订阅函数绑定react（调用时更新react状态和视图）
    // 返回一个函数 unSubscribe 取消订阅函数
    function subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('expected the listener to be a function')
        }

        if (isDispatching) {
            throw new Error('reducer 还没有执行完毕 state不是最新结果')
        }

        let isSubscribed = true

        ensureCanMutateNextListeners()
        nextListeners.push(listener)

        return function unSubscribe() {
            if (!isSubscribed) {
                return 
            }

            if (isDispatching) {
                throw new Error('reducer 还没有执行完毕 state不是最新结果')
            }

            isSubscribed = false

            ensureCanMutateNextListeners()
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
        }
    }

    // 促发一个action 依次遍历所有的reducer纯函数
    function dispatch(action) {
        if (!isPlainObject(action)) {
            throw new Error(
              'Actions must be plain objects. ' +
                'Use custom middleware for async actions.'
            )
          }

        if (typeof action.type === 'undefined') {
            throw new Error(
              'Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?'
            )
          }

        if (isDispatching) {
            throw new Error('reducer 还没有执行完毕 state不是最新结果')
        }

        try {
            isDispatching = true
            currentState = currentReducer(currentState, action)
          } finally {
            isDispatching = false
          }
        const listeners = (currentListeners = nextListeners)
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
          }
      
        return action
    }

    // 替换所有的reducer
    function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') {
            throw new Error('excepted the nextReducer to be a function')
        }
        currentReducer = nextReducer
        dispatch({type: ActionTypes.INIT})
    }
    dispatch({type: ActionTypes.INIT})
    return {
        getState,
        subscribe,
        dispatch,
        replaceReducer
    }
}