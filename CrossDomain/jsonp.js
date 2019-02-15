/**
 * jsonp 只能使用 get请求
 * 不安全，受xss攻击威胁
 * @param {*} param0
 */
function jsonp({ url, params, cb }) {
  var script = document.createElement("script");
  return new Promise(function(resolve, reject) {
    window[cb] = function(data) {
      resolve(data);
      document.body.removeChild(script);
    };
    var script = document.createElement("script");
    var p = { ...params, cb };
    var arr = [];
    for (var key in p) {
      arr.push(`${key}=${p[key]}`);
    }
    script.src = `${url}?${arr.join("&")}`;
    document.body.appendChild(script);
  });
}
