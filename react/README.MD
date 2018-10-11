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

## dom 构建流程

> React 项目挂载到实际实际 dom 中时，调用了 React.render()方法,

> render() 中获取组件实例时会调用 instantiateReactComponent() 方法，并且会遍历子元素,

> instantiateReactComponent() 会更具传入的 node 类型构造不同的 dom 实例
