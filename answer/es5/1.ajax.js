/**
 * readyState
 *  0 初始化
 *  1 open 调用open
 *  2 send 调用send
 *  3 reciving 接收到所有的响应头，开始接受响应体
 *  4 HTTP 响应已经完全接收。
 */
class Ajax {
  createXhr() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    const versions = [
      "MSXML2.XmlHttp.6.0",
      "MSXML2.XmlHttp.5.0",
      "MSXML2.XmlHttp.4.0",
      "MSXML2.XmlHttp.3.0",
      "MSXML2.XmlHttp.2.0",
      "Microsoft.XmlHttp"
    ];
    let xhr;
    for (let i = 0; i < versions.length; i += 1) {
      try {
        xhr = versions[i];
        break;
      } catch (error) {}
    }
    return xhr;
  }

  send(method, url, data, headers, cb, async) {
    const xhr = this.createXhr();
    xhr.open(method, url, async);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(xhr.responseText);
      }
    };
    if (headers) {
      for (let name in headers) {
        xmlhttp.setRequestHeader(name, config.headers[name]);
      }
    }
    xhr.send(data);
  }

  get(url, data, cb, headers, async = true) {
    const query = [];
    for (let k in data) {
      query.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`);
    }
    const nextUrl = query.length ? `${url}?${query.join("&")}` : url;
    this.send("GET", nextUrl, null, headers, cb, async);
  }

  post(url, data, cb, headers, async = true) {
    const body = [];
    for (let k in data) {
      body.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`);
    }
    headers["Content-type"] = "application/x-www-form-urlencoded";
    this.send("POST", url, body.join("&"), headers, cb, async);
  }
}

const httpRequest = new Ajax();

module.exports = { httpRequest };
