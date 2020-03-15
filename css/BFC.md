# Block Formatting Context

什么是 BFC

`BFC 全称是 Block Formatting Context`既块级格式化上下文，是一个关于 CSS 渲染定位的概念。

## 视觉格式化模型

视觉格式化模型是用来处理文档并将它显示在视觉媒体上的机制，是一个 CSS 概念。

视觉格式定义了盒的生成,盒主要包括`块级盒`，`行内盒`，`匿名盒`。

块盒有以下特性

- 视觉上呈现为块，竖直排列
- 参与块格式化上下文

行内盒有以下特性

- 视觉上它将内容和其它行内元素排列为多行
- 行内级元素生成行内盒，参与行内格式化上下文。同时参与生成行内格式化上下文的行内级盒子成为行内盒，所有`display: inline`的非替换元素生成的盒都是行内盒。
- 不参与生成行内格式化上下文的行内级盒成`原子行内级盒`，这些盒由可替换行内元素，或`display`为`inline-block`这样的的元素生成，不能拆分多个盒。

匿名盒

匿名盒也有份匿名块盒与匿名行内盒，因为匿名盒没有名字，不能利用选择器来选择它们，所以它们的所有属性都为 inherit 或初始默认值；

## 三个定位方案

在定位的时候，游览器会根据元素的盒类型盒上下文对这些元素进行定位，可以说`盒是定位的基本单位`。定位时有三种定位方案`常规流`,`浮动`,`绝对定位`。

### 常规流

- 在常规流中，盒一个接着一个排列。
- 在块级格式化上下文中，它们竖向排列。
- 在行内格式化上下文中，它们横向排列。
- 当`position`为`static`或`relative`,并且`float`为`none`时会触发常规流。
- 对于静态定位，盒的位置是常规流布局里的位置。
- 对于相对定位，盒的偏移位置由`top`,`right`,`bottom`,`left`决定，`及时有偏移，任然保留位置`，其他常规流中不能占用这个位置。

### 浮动

- 位于行的开头或结尾
- 导致常规流围绕在它的周边，除非清除浮动

### 绝对定位

- 绝对定位，盒从常规流中剔除，不影响常规流。
- 它的定位相对于它的包含块，有`top`,`right`,`bottom`,`left`等属性决定

## 块级格式化上下文

到这里，已经对 CSS 的定位有一定的了解了，从上面的信息中也可以得知，块格式上下文是页面 CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。

### BFC 创建

- 根元素或其它包含它的元素
- 浮动元素
- 绝对定位元素
- 行内块`display: inline-block`
- 表格单元
- `overflow`不为`visible`
- 弹性盒子

### BFC 的范围

- 一个 BFC 包含创建该上下文元素的所有子元素，但不包括创建了新 BFC 的子元素的内部元素。这从另一方角度说明，一个元素不能同时存在于两个 BFC 中。

### BFC 的作用

BFC 最显著的效果就是建立了一个隔离的空间，断绝空间内外元素间的相互作用。

- 内部的盒子会在垂直方向一个接一个排列。
- 处于同一个 BFC 中的元素相互影响，可能会发生 margin 重叠
- 每个元素的 margin box 的左边，与容器块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；
- 计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算；
- 浮动盒区域不叠加到 BFC 上；

### 实际用例

1. 案例一

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
      .left {
        background: #73de80; /* 绿色 */
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 200px;
        height: 200px;
        float: left;
      }
      .right {
        /* 粉色 */
        background: #ef5be2;
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 400px;
        min-height: 100px;
      }
      .box {
        background: #888;
        margin-left: 50px;
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

绿色框（'#left'）向左浮动，它创建了一个新 BFC，但暂时不讨论它所创建的 BFC。由于绿色框浮动了，它脱离了原本 normal flow 的位置，因此，粉色框（'#right'）就被定位到灰色父元素的左上角（特性 3：元素左边与容器左边相接触），与浮动绿色框发生了重叠。
同时，由于灰色框（'#box'）并没有创建 BFC，因此在计算高度的时候，并没有考虑绿色框的区域（特性 6：浮动区域不叠加到 BFC 区域上），发生了高度坍塌，这也是常见问题之一。

2. 案例二

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
      .left {
        background: #73de80; /* 绿色 */
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 200px;
        height: 200px;
        float: left;
      }
      .right {
        /* 粉色 */
        background: #ef5be2;
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 400px;
        min-height: 100px;
      }
      .box {
        background: #888;
        margin-left: 50px;
      }
      .bfc {
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="box bfc">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>
</html>
```

通过设置 overflow:hidden 来创建 BFC。所以灰色框创建了一个新的 BFC 后，高度发生了变化，计算高度时它将绿色框区域也考虑进去了（特性 5：计算 BFC 的高度时，浮动元素也参与计算）；

3. 案例三

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
      .left {
        background: #73de80; /* 绿色 */
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 200px;
        height: 200px;
        float: left;
      }
      .right {
        /* 粉色 */
        background: #ef5be2;
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 400px;
        min-height: 100px;
      }
      .box {
        background: #888;
        margin-left: 50px;
      }
      .bfc {
        overflow: hidden;
      }
      .little {
        background: #fff;
        width: 50px;
        height: 50px;
        margin: 10px;
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="box bfc">
      <div class="left"></div>
      <div class="right">
        <div class="little"></div>
        <div class="little"></div>
        <div class="little"></div>
      </div>
    </div>
  </body>
</html>
```

由于粉色框没有创建新的 BFC，因此粉色框中白色块受到了绿色框的影响，被挤到了右边去了。先不管这个，看看白色块的 margin。

4. 案例四

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
      .left {
        background: #73de80; /* 绿色 */
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 200px;
        height: 200px;
        float: left;
      }
      .right {
        /* 粉色 */
        background: #ef5be2;
        opacity: 0.5;
        border: 3px solid #f31264;
        width: 400px;
        min-height: 100px;
      }
      .box {
        background: #888;
        margin-left: 50px;
      }
      .bfc {
        overflow: hidden;
      }
      .little {
        background: #fff;
        width: 50px;
        height: 50px;
        margin: 10px;
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="box bfc">
      <div class="left"></div>
      <div class="right bfc">
        <div class="little"></div>
        <div class="little"></div>
        <div class="little"></div>
      </div>
    </div>
  </body>
</html>
```

一旦粉色框创建了新的 BFC 以后，粉色框就不与绿色浮动框发生重叠了，同时内部的白色块处于隔离的空间（特性 4：BFC 就是页面上的一个隔离的独立容器），白色块也不会受到绿色浮动框的挤压。利用 BFC 防止了 margin 的重叠
