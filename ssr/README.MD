# 前端技术选型

## 传统多页面应用

### 多页应用特征

jsp,php,node

- 内容都由服务端模版生成
- 每次页面跳转都经过服务端 - 增加等待过程

#### 常用类库

- jquery - 对原生 dom 操作，事件，兼容性的封装
- mooTools - 对原生 prototype 的拓展和修改
- YUI - UI 层处理

#### 架构工具

后端提供

- grunt 任务脚本处理器，问题（执行效率比较低，直接从硬盘读取数据）
- gulp（grunt 的升级版）管道流（效率比 grunt 高）

#### 模块化工具

##### seaJs

CMD 规范

##### requireJs

ADM 规范

#### 静态文件

grunt 和 gulp 等工具手工变异到 html 中，自由度较低，操作复杂。

## 单页面应用

### 单页面应用特征

- 所有内容都在前端生成
- js 承担更多的业务逻辑，后端只提供 api
- 页面路由前端处理

#### 常用类库

backBone(也可以实现但页面应用) mvc 模式

- react - jsx
- vue - .vue
- angular - typeScript

对 dom 的抽象（高性能）

> react 和 vue 区别：react 单向数据流至顶向下（数据操作集中），vue 双向数据流

> angular2 使用 typeScript 开发，支持 http2，systemJS，所有模块异步加载

#### 架构工具

- npm
- bower
- jspm （面向未来，区分前后端包，systemJS，http2）

#### 构建工具

- webpack
- rollup （按需加载引用的函数，bundle.js 包比较小）
- broswerify

#### 静态文件

交由构建工具处理

#### 其他因素

游览器兼容性
toB（重业务复杂度） 还是 toC（交互要求高，性能要求高）
移动端还是 PC 端（分辨率不同，移动端的网络问题）
