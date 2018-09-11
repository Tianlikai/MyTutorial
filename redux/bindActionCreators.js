function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args))
}

function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    if (typeof actionCreators !== 'object' || typeof actionCreators === null) {
        throw new Error('wrong')
    }
    let boundActionCreators = {}
    let keys = Object.keys(actionCreators)
    for (let i = 0; i < keys.length; ++i) {
        let key = keys[i]
        let actionCreator = actionCreators[key]
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return boundActionCreators
}