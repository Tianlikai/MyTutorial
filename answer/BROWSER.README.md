# 1 script 标签 defer 和 async 的区别

首先 defer 和 async 标签都表示该脚本不会使用到`document.write()`，defer 表示延迟脚本的加载，知道文档载入和解析完成以后，才可以操作。async 属性使得游览器可以尽快的执行脚本，而不用在下载脚本时阻塞渲染。

# 2 html 文档的加载流程

1. web 游览器创建文档对象，并且开始解析页面。这个阶段 document.readyState 状态为`loading`
2. 当遇到没有`async`和`defer`属性的<script>标签时，页面会阻塞下载脚本，并切执行，然后重新开始解析文档
3. 当遇到`async`属性的<script>标签时，会开始下载脚本，并且继续解析文档，脚本会在下载完成后尽快的执行
4. 当文档解析完成，document.readyState 状态为`interactive`
5. 当遇到`defer`属性的<script>标签时，会开始下载脚本，并且在文档解析完成之后，开始执行 defer 脚本
6. 触发 DOMContentLoaded 事件，标志着程序从同步脚本执行到异步事件驱动阶段，此时可能有`async`脚本还未执行
7. 当文档解析完成时，可能页面还在等待其他资源加载，当所有资源加载完成时 document.readyState 状态为`complete`，游览器触发`load事件`
8. 从此，会调用异步事件，异步响应用户输入，网络事件，计时器等

# 3 游览器安全性

1. 同源策略
2. 跨域
3. web 攻击防御

# 4 事件处理

1. 事件的三个阶段

   - 事件捕获，当 dom 树上的节点发生了一些操作时，从 window 发出一个事件，不断进过下级节点，知道目标节点
   - 目标阶段，当事件传播到到目标节点时，事件就在目标节点上发生
   - 事件冒泡，从事件源，自下而上

2. 阻止事件传播

   - w3c, stopPropagation()
   - ie, cancelBubble = true

3. 防止默认行为

   - w3c, preventDefault()
   - ie, return false

4. dom2
   addEventListener(eventType, handler, useCapture) useCapture 为是否使用事件捕获

# 5 游览器的架构

# 6 游览器中的事件循环

# 7 url 到页面的渲染流程

# 8 事件代理
