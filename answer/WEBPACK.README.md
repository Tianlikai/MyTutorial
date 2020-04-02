# webpack 打包速度优化

1. 使用高版本 node 和 webpack

2. 缩小打包作用域

3. 多进程打包

- happyPack
- thread-loader
- paralleal-webpack

4. 提取页面公共资源

- SplitChunkPlugin
- CDN

5. DLL PLUGIN

6. 开启缓存

- babel-loader 开启缓存
- cache-loader
- hard-source-webpack-plugin
- terser-webpack-plugin

# webpack 打包体积优化

1. tree shaking

2. 动态 polyfill

3. 按需加载

4. puseCss-webpack-plugin

5. css js 压缩

6. splitChunks

- cache group, chunks 设置为 async 异步包
