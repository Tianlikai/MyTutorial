# react 遇到的问题总结

react 的理解

- 虚拟 dom，对于节点的操作都在虚拟 dom 上进行，最后一次性更新到页面中
- 生命周期，有不同的生命周期，在不同的生命周期进行数据管理
- 单线数据流，纯函数
- diff 算法
- 组件化

## 1 key

在 diff 算法中，当比较的两颗树在兄弟节点时，key 可以作为唯一标识起到节点复用的效果。
场景以及性能：

- 在针对大量傻瓜组件的删除和插入场景，使用下标作为 key 性能较好
- 在针对重新排序的场景，使用唯一的 key 性能较好

常见的 key 的作用以及 bug

- 更换一个元素的 key 可以快速更新一个元素的功能
- 在具有状态的组件内，key 一定需要保持唯一，否则或导致组件状态混乱。

## 2 setState

[由实际问题探究 setState 的执行机制](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247483989&idx=1&sn=d78f889c6e1d7d57058c9c232b1a620e&chksm=ce6ec6f9f9194fef681c79ee869bf58d5413132c73496710b2eb32c859a2249a895c2ce8a7cd&scene=21#wechat_redirect)

### 使用方式

```
/**
 * 接收两个参数
 * @params {func | obj} 可以是一个函数或者一个对象，为对象时多次连续的setState将会合并
 * @params {func} 回调函数，能拿到最新的state
 setState({number: 1}, () => {console.log(this.state)})
 setState((preState, preProps) => ({number: 1}), () => {console.log(this.state)})
**/
```

### 总结

- 在 React 生命周期和合成事件中，React 处于其更新机制中，无论调用多少次 setState 都不会立即执行更新，而是将要更新的状态存入 pendingStateQueue,将要更新的组件存入 dirtyComponent。当上一次更新机制执行完毕，以生命周期为例，最顶层组件的 didMount 后将会批处理标志位为 false，这时将取出 dirtyComponent 的组件以及 pendingStateQueue 中的 state 进行更新。这样确保组件不会被重新渲染多次。所以 setState 本身并不是异步的，而是 React 的执行机制给人一种异步的感觉。

- 当在异步代码中执行 setState 时，由于 js 的异步执行机制，会将异步代码放入任务队列，等待同步代码执行完毕后再执行，这时 react 更新机制已经走完，标志位处于 false 状态，此时调用 setState 能拿到最新结果。

- 在原生事件中调用 setState 不会触发 react 更新机制

- setState 接收的第一个参数可以为对象或者函数，当为对象时多次调用会进行合并，而为函数时不会进行合并

## 3 生命周期

## 4 context

## 5 router 源码

## 6 redux 源码

## 7 react-redux 源码

## 8 fiber 架构

## 9 hook

## 10 diff

## 11 ssr
