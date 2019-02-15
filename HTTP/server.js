const http = require("http");
const fs = require("fs");

/**
 *  cookie
 *
 * 响应时在 header 中写入 set-cookie 字段
 * res.writeHead(200, {
 *  "Content-type": "text/html",
 *  "Set-Cookie": "name=bob"
 * });
 * 下次请求时都会带上cookie 字段 Cookie: "name=bob"
 * "Set-Cookie" 可以为一个数组，写入多条信息
 * 关闭游览器会清理掉cookie
 * max-age=10 设置cookie过期时间
 * httpOnly 禁止js访问 cookie
 * Domain 设置二级域名下的cookie
 */
http
  .createServer(function(req, res) {
    console.log("request come", req.url);
    const { host } = req.headers;

    if (req.url === "/") {
      const html = fs.readFileSync("index.html", "utf-8");
      res.writeHead(200, {
        "Content-type": "text/html",
        "Set-Cookie": ["name=bob; max-age=10", "age=12; httpOnly"]
      });
      res.end(html);
    } else if (req.url === "/script.js") {
      res.writeHead(200, {
        "Content-type": "text/javascript",
        "Cache-Control": "max-age=20"
      });
      res.end('console.log("test cache!")');
    }
  })
  .listen(3333);
console.log("server is running on 3333");
