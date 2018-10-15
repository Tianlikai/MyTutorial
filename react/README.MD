# React

- dom 模型
- dom 构建流程
- 事件系统
- 生命周期
- 更新机制（setState）（批量更新）
- diff 算法

## dom 模型

React dom 由一下几种

- 空类型
- 文本 dom
- 基础 dom 组件类型
- 自定义组件类型

> React 提供 React.createElement() 方法创建 dom 元素，
> React 提供 React.createClass() 方法创建自定义组件，
> 这里 JSX 语法会被翻译为 React 提供的 API 方法构建 dom，
> ⚠️ 无状态组件为什么没有生命周期

## 三种元素类型

- text 文本元素 - ReactDOMTextComponent (文本元素构造函数)
- basic element 基本元素 - ReactDOMComponent （基本原属构造函数）
- custom element 自定义元素 - ReactDOMCompositeComponent （自定义元素构造函数）

ReactDOMTextComponent | ReactDOMComponent | ReactDOMCompositeComponent，分别实现 mountComponent | receiveComponent 方法

mountComponent 实现元素的首次装载

receiveComponent 实现元素的更新

由于 ReactDOMTextComponent | ReactDOMComponent | ReactDOMCompositeComponent 都统一实现装载和更新，所以在实例调用时可以统一实现方式。

## dom 构建流程

> React 项目挂载到实际实际 dom 中时，调用了 React.render()方法,

> render() 中获取组件实例时会调用 instantiateReactComponent() 方法，并且会遍历子元素,

> instantiateReactComponent() 会更具传入的 node 类型构造不同的 dom 实例
