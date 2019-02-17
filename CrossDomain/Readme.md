## 同源策略

协议，域名，端口都相同为同域

## 为什么游览器不支持跨域

- Cookie，LocalStorage 保护
- Dom 操作，iframe 引入
- ajax

## 实现跨域的方法

- jsonP
- cors
- postMessage
- document.domain
- window.name
- location.hash
- http-proxy
- nginx
- websocket

## jsonP

通过标签引入的外部字段，例如<script />, <link />, <img />

局限

- 只支持 get 请求
- 具有 xss 注入风险

## cors

通过纯后端实现，后端通过设置 http 请求头对访问进行限制。

## postMessage

通过 <iframe> 引入的页面中之间的通信
