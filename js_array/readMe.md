# js 数组总结

## 写在前面

这里只是对 javaScript 数组的常用属性和方法的细节进行总结
以便在开发时，能快速和准确的使用数组

1 数组基础定义和 js 数组的特性
2 数组的属性
3 数组的方法和方法的细节缺陷
4 相似方法间的区别
5 数组的适应场景和应用
6 数组的奇异点

```
## 技术栈

- react 16.3xx
- react-dom
- react-router 4.xx
- mobx 数据流
- webpack 4.xx
- ESLint 代码规范
- axios 异步请求
- antd ui
- mock 模拟接口数据

## 开发环境

- git clone https://github.com/Tianlikai/mobxSpa.git
- npm i
- npm run dev

## 生产环境

- npm run build

## 项目理解指南

- 此处先了解项目如何启动并如何运行所以请先忽略 webpack 等工具
- 首先请看明白之前的“文件目录”
- 看懂项目主要是看懂项目骨架
- /src/index.js 先看项目入口
- /src/pages/Home.js 主文件骨架 进入文件看注释（结合/src/settings/routeAndPermissions.js 看）
- /src/settings/routeAndPermissions.js 配置文件 （结合/src/pages/Home.js 看）
- /src/pages/myAgent/index.js 项目子模块 进入文件看注释 （结合/src/settings/routeAndPermissions.js 看）

## 待优化项

- 权限/路由/目录 三者之间项目映射 简化配置
- mobx 性能优化
- 编写单元测试
- 异步请求优化
- 动态加载组件 [react-loadable](https://github.com/jamiebuilds/react-loadable)

## 未来展望

- css in js [style-component](https://github.com/styled-components/styled-components)
- 脚本生成组件模块以及测试用例
- 离线优先

## 注意

- windows 平台下“git clone”项目可能会出现丢失 src 目录下部分代码
- windows 平台下可以通过 Download Zip 形式下载
- 解压后部分“import”文件名或出错，通过“npm i” -> "npm run dev“ 会抛出所有错误文件目录定位
- 找到修改为正确的文件目录即可
```
