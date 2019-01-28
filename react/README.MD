# React

- dom 模型
- dom 构建流程
- 事件系统
- 生命周期
- 更新机制（setState）（批量更新）
- diff 算法

## 顶层 API

### React.Component

### React.PureComponent

PureComponent 和 Component 相似，但是 PureComponent 实现了 shouldComponentUpdate() 周期的重写，在内部实现了一个关于 props 和 state 的牵比较。

> ⚠️ PureComponent 的 shouldComponentUpdate 只是实现了对简单数据的比较，在面临嵌套的复杂数据结构时你可以用 immutable objects 来快速比较。
> 而且必须确认 PureComponent 组件的子节点也是 PureComponent，应为 PureComponent 的 shouldComponentUpdate 会跳过所有自组件的 render

### React.memo

React.memo() 和 React.PureComponent 相似，但这是针对函数式组件的优化，同样在内部会做简单数据比较，而且会缓存上一次渲染结果，如果 props 和 state 不变这直接使用跳过渲染，并且该函数接受第二个参数，自定义的比较函数。

### createElement()

### createFactory()

### cloneElement()

### isValidElement()

### React.Children

### React.Fragment

### React.createRef

### React.forwardRef

### React.lazy

### React.Suspense

## 未实现类容

- instantiateReactComponent 没有实现空类型处理
- 事件代理直接使用 jquery 代理到 document，React 的事件处理非常复杂，实现了一套标准的 w3c 事件。
- tagOpen 和 tagClose 没有针对 input，img 等非闭合标签进行处理

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

## diff 算法

首先看 diff 策略

- 忽略 WEB UI 中 DOM 节点的跨层级操作
- 拥有相同类的两个组件将会生成相同的树型结构，拥有不同类的组件将会生成不同的树形结构
- 对于统一层级的一组子节点，它们可以通过唯一 id 进行区分

### tree diff

针对两棵树，对树进行分层比较，只会对相同层次的节点进行比较。

> 既然 DOM 节点跨层级的移动操作少到可以忽略不计，针对这一现象，React 通过 updateDepth 对 Virtual DOM 树进行层级控制，只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。

### component diff

React 是基于组件构建应用的，对于组件间的比较所采取的策略也是简洁高效。

- 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
- 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。

### element diff

- 插入操作，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
- 移动操作，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。
- 删除操作，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。
