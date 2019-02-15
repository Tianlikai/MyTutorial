/**
 * CORS 预请求
 * Request-Method: OPTIONS
 *
 * 以下情况不需要 预请求
 * 允许方法
 * GET
 * HEAD
 * POST
 *
 * 允许Content-Type
 * text/plain
 * multipart/form-data
 * application/x-www-form-urlencoded
 *
 * 其他限制上网具体查
 */

/**
 * 以下头只是一些规范，不是强制性约定
 *
 * 缓存头
 *
 * 可缓存性
 * public
 * private
 * no-cache 需要经过服务器验证, 验证缓存资源是否更新
 *
 * 到期，缓存何时到期 - 需要结合前端打包工具的hash值更新缓存
 * max-age=<seconds>
 * s-maxage=<seconds> 为代理服务器设置，优先使用
 * max-stale=<seconds> 发起请求方设置
 *
 * 重新验证
 * must-revalidate
 * proxy-revalidate
 *
 * 其他
 * no-store 不会读取缓存资源，每次都会获取服务器资源
 * no-transform 不允许修改
 *
 * 资源验证
 * 上次修改时间
 * last-modified 匹配 if-modified-since/if-unmodified-since 对比上次资源，是否需要更新
 *
 * Etag 匹配 If-None-Match 数据签名
 *
 */
const http = require("http");

http
  .createServer(function(req, res) {
    console.log("request come", req.url);
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*", // cors 跨域
      "Access-Control-Allow-Headers": "X-Test-Cors", // 允许的头，会做 cors 预请求
      "Access-Control-Allow-Method": "GET, POST, PUT, DELETE, HEAD, OPTIONS", // 允许的请求的方法
      "Access-Control-Max-Age": "1000" // 预请求结果缓存时间
    });
    res.end("return info");
  })
  .listen(8888);
console.log("server is running on 8888");
