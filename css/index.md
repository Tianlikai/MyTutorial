## 1. position 都有哪几种定位方式，你能讲解一下吗？

position 总共有四种定位方式，分别是：

- static 无特殊定位
- relative 相对定位，相对于其文档流中的位置进行定位,并且该元素会继续保留其在文档流中的位置
- absolute 绝对定位，相对于其最近`position`属性不为`static`的父元素进行定位，该元素会`脱离常规文档流`
- fixed 固定定位，相对于游览器进行定位，但是当其`任意一个父元素具有transform属性时fixed会失效`

---

## 2. 盒子模型

一个盒子模型由外到内一共由四部分组成：`margin`,`border`,`padding`,`content`。margin，border，padding 分别是 css 属性，content 则是 html 元素的内容。

常用的盒子模型有两种，可以通过 css 属性`box-content`进行设置：

- `inherit` 从父元素继承 box-content 属性
- `content-box` 标准盒子模型，为`默认值`，设定的 `width`和`height` 就是元素的 `content` 大小
- `border-box` ie 盒子模型，设定的`width`和`height`包含元素的`content, padding和border`

---

## 3. 你能描述一下 BFC 吗？什么情况下会触发 BFC? BFC 的渲染规则？应用场景有哪些?

### 3.1. 什么是 BFC

在 W3C 的定义如下：浮动元素，绝对定位元素，非块级盒子的块级容器，以及 overflow 不为 visible 的元素都会为它们的内容创建一个 BFC 块级格式化上下文。

### 3.2. 那些情况会触发 BFC

- 根元素
- 浮动元素
- 行内块元素 inline-block
- 绝对定位元素和固定定位元素
- overflow 不为 visible 的元素
- 设置为弹性盒子 flex
- 设置为 table

### 3.3. BFC 的渲染规则如下

- (1) BFC 垂直方向的 margin 会发生重叠
- (2) BFC 不会和浮动元素发生重叠
- (3) BFC 是一块独立的渲染区域，内外元素不会相互影响
- (4) BFC 计算高度时，会将浮动元素包含在内

### 3.4. BFC 有那些应用场景

#### 3.4.1. 防止父级元素高度塌陷

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        background: #888;
        overflow: hidden; /* 生成BFC 解决高度塌陷问题*/
      }
      .left {
        background: #73de80; /* 绿色 */
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 200px;
        height: 200px;
        float: left;
      }
      .right {
        background: #ef5be2; /* 粉色 */
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 400px;
        min-height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>
</html>
```

#### 3.4.2. 解决垂直方向 margin 重叠问题

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box1 {
        background: #73de80; /* 绿色 */
        width: 200px;
        height: 200px;
        margin-bottom: 10px;
        display: inline-block; /* 生成BFC 解决边距重叠问题*/
      }
      .box2 {
        background: #ef5be2; /* 粉色 */
        width: 200px;
        height: 200px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="box1"></div>
    <div class="box2"></div>
  </body>
</html>
```

---

## 4. 水平垂直居中方案大全
