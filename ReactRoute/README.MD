## resolve

- alias 配置别名
- extensions 自动添加拓展名
- modules ['node_modules', './lib'] 自动解析除 node_modules 以外的文件

## loader

loader 从右往左执行

- css-loader 将 css 文件变成一个模块
- style-loader 将 css 文件插入 header 中

### sass-loader

必须结合 node-sass 使用

### postcss-loader

### file-loader

解析图片地址，并且把图片从源位置拷贝到目标位置

```
        use: {
          loader: "file-loader",
          options: {
            outputPath: "images/" // 设置输出路径
          }
        }
```

### url-loader

当文件较小时，使用 base64 将文件内嵌到 html 中

```
        use: {
          loader: "url-loader",
          options: {
            limit: 1024, // 设置是否转换 base64 分解线
            outputPath: "images/"
          }
        }
```

## module

### copy-webpack-plugin

复制静态文件

### uglifyjs-webpack-plugin

js 压缩

### optimize-css-assets-webpack-plugin

css 压缩

### webpack.ProvidePlugin

自动往模块注入变量

### webpack.DefinePlugin

定义全局变量，依据当前开发环境，向系统区分插入该变量

### webpack.HotModuleReplacementPlugin

- 配合 devServer 使用

```
  // 添加一下两项配置
  devServer: {
    inline: env.INLINE,
    hot: env.HOT,
  }
```

webpack 启动热更新

### webpack.NamedModulesPlugin

以 name 命名模块

### clean-webpack-plugin

每次打包清除指定目录

### html-webpack-plugin html 模版

- template 指定产出的模版
- filename 指定产出的文件
- title 设置 html 中 header 中的 title
- hash 添加 hash 避免缓存
- inject 是否指定插入 script 标签

### mini-css-extract-plugin

从 js 文件中抽离 css 创建单独文件

提取样式，单独生成文件

## webpack-dev-server

本地服务器，运行在内存中

- contentBase 服务文件目录
- compress 是否 gzip 压缩
- port 设置端口
- open 是否制动打开游览器

## DLL 动态链接库

### webpack.dll.config.js

输出 vendor.dll 文件，通过 webpack.DllPlugin 插件输出 manifest.json 映射文件

### webpack.DllReferencePlugin

webpack.config.js 使用该插件根据 manifest.json 映射文件引用公共库

## happypack

启用多线程打包

## 热更新原理

事件冒泡机制

子节点的父节点没有处理该事件，会一直冒泡到顶部游览器，到达游览器，游览器会刷新
