# 1 web 攻击

## XSS 跨站脚本攻击

1. 存储型
2. 反射性
3. 文档型

防御手段

1. 对用户输入进行过滤
2. 针对 cookie 设置 httpOnly,不可读取用户 cookie

## CSRF 跨站请求伪造

1. 自动发 Get 请求
2. 自动发 Post 请求，通过表单
3. 诱导用户点击

防御机制

1. cookie 设置 sameSite 字段，游览器禁止第三方请求携带 cookie
2. 验证来源站点，Origin 和 Refer
3. csrf token

# 2 https 为什么让数据传输更安全

由于 http 是以明文进行传输的，所以 http 在传输的每一环节都面临这被篡改的风险。

https 是 http 的加强版，其原理是在 http 和 tcp 中加了一个中间层，中间层会将数据进行加密，然后通过 tcp 传输，tcp 还需要负责解密。

## 对称加密 & 非对称加密

1. 对称加密指的是加密和解密的密钥是同一把
2. 非对称加密，有 a 和 b 两把密钥，用 a 进行加密，然后用 b 进行解密

对称加密，游览器和 server 端加密和解密的过程：

- 游览器个给 sever 端发送一个 client_random 和一个加密方法列表
- server 端返回宇哥 server_random 和一个加密方法
- 现在三者拥有相同的凭证，client_random & server_random & 加密方法

然后更具 client_random & server_random 通过加密方法生成密钥，这个密钥就是客户端和服务端之间通信的密钥

`由于第三方可以在中间获取client_random & server_random & 加密方法`，从而截获密钥，所以对称加密不堪一击
