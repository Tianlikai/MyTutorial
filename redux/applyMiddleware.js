const compose = require('./compose')

function applyMiddleware (...middlewares) {
    return (createStore) => (reducer, initialState, enhancer) => {
        let store = createStore(reducer, initialState, enhancer)
        let dispatch
        let chain = []
        let middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}