# 1 盒子模型

盒子模型是 dom 所采取的布局模型，可以使用 box-sizing 属性进行设置；

- box-sizing: content-box; // 标准盒子模型
- box-sizing: boder-box; // IE 盒子模型

差异

1. 标准盒子模型的大小: content + padding + border + margin; // content 指的是 height 和 width
2. IE 盒子模型的大小: (width|height) + margin; // 其中 width = content + padding + border

# 2 清除浮动的方式

浮动元素会脱离文档流，导致父级元素高度塌陷

- 在父级元素后添加一个空`div`元素，并且设置`clear: both`
- 为父级元素添加`::after`伪元素，设置为块级元素，content 设置为空，同样设置`clear: both`
- 设置`overflow: hidden`属性，生成一个独立的 bfc
- 设置父级容器高度

# 3 水平垂直居中的方式

1. `{ position: absolute; left: 50%; top: 50%; margin-left: -width/2; margin-top: -height/2 }`
2. `{ position: absolute: left: 50%; top: 50%; transform: translate(-50%, -50%) }`
3. `{ display: flex; justify-content: center; align-item: center }`

# 4 伪类和伪元素

- 伪类用于向选择器添加特殊效果
- 伪元素用于将特殊的效果添加到选择器

两者的作用都是为选择器添加一些特殊的效果，两者的不同是，`伪类可以通过添加一个实际的类，来达到类似的效果，但是伪元素必须通过添加一个实际的元素来达到相同的效果，所以它们才一个叫做伪类一个叫做伪元素`

# 5 选择器的优先级

!important > 行内 > id 选择器 > 类选择器 > tag > \* > 继承 > 默认

# 6 padding-top：100%；

`margin`和`padding`的值设置为`百分比`时，其大小是参照值是父容器的宽度。

# 7 bfc

bfc 是块级格式化上下文的缩写，块级格式化上下文是独立的渲染区域，让处于 bfc 内部的元素和外部元素相互隔离，使内外元素定位不会相互干扰。

触发 bfc 机制的方式有：

- 根元素
- 固定定位和绝对定位元素
- 浮动元素
- overflow: hidden;
- 行内块

bfc 的特性：

- 内部的盒子会在垂直的方向上诶个排列
- 处于同一个 bfc 容器中的元素会发生 margin 重叠
- 每一个元素 margin box 的左边和容器的 border box 的左边相接触
- bfc 是页面是一个独立的渲染区域，容器内外的元素不会相互影响
- bfc 容器会计算所有子元素的高度，包括浮动元素
- 浮动盒区域不会叠加到 bfc 上

# 8 font-size line-height verticle-align

首先对于文本来说存在一个`内容区域(content area)`,可以理解为用光标选中文字时带的背景区域。它同时收到`font-size`和`font-family`的影响。内容区域的高度别不会影响实际元素的高度。对于`行内元素`来说影响其高度的只有`line-heihgt`

`行距` = `line-height` - `font-size`
`verticle-align`有顶线，中线，基线，底线。默认按照基线对齐，基线是按照字母`x`的底部进行对齐的，所以当字体大小改变时对齐方式可能会发生改变。

# 9 重绘和回流

回流会根据当前渲染树信息，重新生成元素渲染的布局位置信息，而重绘是根据渲染树和回流生成的元素位置信息进行绘制的过程，所以发生回流一定发生重绘，而发生重绘不一定发生回流。

触发回流的操作包括：

- 页面初始化渲染
- 页面添加或者删除 dom
- 页面元素位置信息发生改变
- 页面元素内容发生改变
- 页面窗口大小发生改变

触发重绘的操作包括：

- 页面触发回流
- 页面元素样式发生改变，并且不会影响元素的位置信息时，将会发生重绘。

`注意，现代游览器对回流和重绘操作进行了优化，游览器会维护一个队列，当有变化发生时操作会进入队列，当队列中的长度或者时间达到一定值时，游览器会清空队列，别执行队列中的操作`
`还需要注意，当dom访问元素位置信息属性时，由于访问的时实时信息，所以游览器将会立马清除队列`

避免重绘的方法

1. css

- 避免使用 css 表达式
- 尽量在 dom 树的最末端改变 class
- 将动画，添加到`position: absolute`上，脱离文档流

2. js

- 避免频繁操作 dom 样式，最好是一次性写入
- 将多次 dom 操作，合并到一个 documentFragment，在此上面进行操作。最后把它添加到文档中。
- 避免频繁读取会引发回流和重绘的属性
- 先使用`display: none`，然后继续在元素上进行改变样式，最终`display: block`，减少页面重绘

# 10 层叠上下文

层叠上下文是 html 中的一个三维概念，z 轴代表就是层叠，

触发条件：

- 根 html
- `position`不为`static`,并且`z-index`为具体的数字
- css3 属性，`flex`,`transform`,`opacity`,`filter`,`will-change`,`-webkit-overflow-scrolling`
- 层叠等级，在统一层叠上下文中：backgroud/border < z-index: - < block < 浮动 < 行内 < z-index: 0|auto < a-index: +

# 11 link 和 import 的区别

- link 支持的功能较多，支持 rel 的属性
- import 在 ie5 之后才能使用
- 页面加载到 link 时会同步加载 css，而 import 会等到页面加载完成之后才加载
- link 可以使用 js 动态倒入，而 import 不支持
