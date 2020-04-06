## 1. 你能描述一下 react 的生命周期吗？

### 1.1 react 在挂载时，更新时，卸载时分别会掉用不同的生命周期方法

#### 1.1.1 挂载时

- constructor(props) 初始化 props & state
- static getDerivedStateFromProps(props, state) 通过 props 衍生出 state，该函数 return 的结果就是新的 state
- render()
- componentDidMount() 已经生成真实的 dom，此时可以做一些事 ajax 请求和事件监听的操作

#### 1.1.2 更新时

- static getDerivedStateFromProps(props, state)
- shouldComponentUpdate(nextProps, nextState) 默认返回`true`,返回 true 则继续执行之后的生命周期，false 则不会继续执行
- render()
- getSnapshotBeforeUpdate(preProps, preState) 该方法的返回值，会又一个返回 🈯️，作为 componentDidUpdate 的第三个参数
- componentDidUpdate(preProps, preState, snapshot) 更新已经插入真实的 dom，在该生命周期方法中也可以做一些获取 dom 的操作，以及加入逻辑计算是否需要更新组件的 state

#### 1.1.3 卸载时

- componentWillUnmount() 在这里可以做一些事件清理的工作

### 1.2 react 在 渲染 出错时会调用以下方法

#### 1.2.1 static getDerivedStateFromError(error)

该生命周期会在其后代组件抛出错误时进行调用，接收的是抛出的错误信息，该方法更新 state 来达到`渲染降级ui`

> 注意
>
> 由于该生命周期处于`渲染阶段`(会在后文进行介绍)，因此不允许使用副作用。所以在需要的情况使用 componentDidCatch()方法

#### 1.2.2 componentDidCatch(error, info)

该生命周期会在其后代组件抛出错误时进行调用，接收两个参数：抛出的错误信息以及组件错误信息堆栈
componentDidCatch()在`提交阶段`(后文会介绍)被调用，所以允许使用副作用

> 注意
>
> 如果发生错误，你可以调用 setState 是 componentDidCatch()`降级ui`，但是在未来版本中推荐使用
> static getDerivedStateFromError()来降级 ui

### 1.3 react 生命周期分为三个阶段

#### 1.3.1 render 阶段

render 阶段，纯净且不包含副作用，可以被终止或重新启动，以下生命周期处于该阶段：

- constructor(props)
- static getDerivedStateFromProps(props, state)
- static getDerivedStateFromError(error)
- shouldComponentUpdate(nextProps, nextState)
- render()

#### 1.3.2 pre commit 阶段

该阶段可以读取 dom，以下生命周期处于该阶段：

- getSnapshotBeforeUpdate(preProps, preState)

#### 1.3.3 commit 阶段

该阶段可以读取 dom，并且执行副作用并且安排更新，以下生命周期处于该阶段：

- ­React 更新 ­D­O­M 和 refs
- componentDidMount()
- componentDidUpdate(preProps, preState, snapShot)
- componentWillUnmount()

### 1.4 为什么 getDerivedStateFromProps 要设计为 static？

### 1.5 为什么要删除 react 15 中的 componentWillMount(),componentWillUpdate()以及 componentWillReceiveProps()？
