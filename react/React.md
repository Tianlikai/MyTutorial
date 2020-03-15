# react

## setState

[由实际问题探究 setState 的执行机制](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247483989&idx=1&sn=d78f889c6e1d7d57058c9c232b1a620e&chksm=ce6ec6f9f9194fef681c79ee869bf58d5413132c73496710b2eb32c859a2249a895c2ce8a7cd&scene=21#wechat_redirect)

### 使用方式

```
/**
 * 接手两个参数
 * @params {func | obj} 可以是一个函数或者一个对象，为对象时多次连续的setState将会合并
 * @params {func} 回调函数，能拿到最新的state
 setState({number: 1}, () => {console.log(this.state)})
 setState((preState, preProps) => ({number: 1}), () => {console.log(this.state)})
**/
```

### 总结

- 在 React 生命周期和合成事件中，React 处于其更新机制中，无论调用多少次 setState 都不会立即执行更新，而是将要更新的状态存入 pendingStateQueue,将要更新的组件存入 dirtyComponent。当上一次更新机制执行完毕，以生命周期为例，最顶层组件的 didMount 后将会批处理标志位为 false，这是将取出 dirtyComponent 的组件以及 pendingStateQueue 中的 state 进行更新。这样确保组件不会被重新渲染多次。所以 setState 本身并不是异步的，而是 React 的执行机制给人一种异步的感觉。

- 当在异步代码中执行 setState 时，由于 js 的异步执行机制，会将异步代码放入任务队列，等待同步代码执行完毕后再执行，这是 react 更新机制已经走完，标志位处于 false 状态，此时调用 setState 能拿到最新结果。

- 在原生事件中调用 setState 不会触发 react 更新机制

- 多次连续的 setState 会合并为一次

## key

## diff

## fiber

## 上下文切换
