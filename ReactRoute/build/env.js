const VERSION = require("../package.json").version;
const PROTOCOL = "http";
const HOST = getIpAddress();
const PORT = 8080;
const FRONTEND = `${PROTOCOL}://${HOST}:${PORT}/`;

const config = {
  VERSION,
  PROTOCOL,
  HOST,
  PORT,
  FRONTEND,
  DevMode: process.env.NODE_ENV
};

module.exports = config;

function getIpAddress() {
  let interfaces = require("os").networkInterfaces();
  for (let devName in interfaces) {
    let iFace = interfaces[devName];
    for (let i = 0; i < iFace.length; i++) {
      let alias = iFace[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

(function output(config) {
  let KEYS = Object.keys(config);
  let MAX_LENGTH = Math.max(...KEYS.map(k => k.length)) + 2;

  console.log(
    "\r\n\x1b[36m==================== 环境变量 ======================\x1b[0m"
  );
  Object.keys(config).forEach(k => {
    let color = config[k] === true ? "\x1b[35m" : "";
    let len = k.length;
    let prefix = len < MAX_LENGTH ? " ".repeat(MAX_LENGTH - k.length) : "";
    console.log("%s%s: %j\x1b[0m", color, prefix + k, config[k]);
  });
  console.log(
    "\x1b[36m===================================================\x1b[0m\r\n"
  );
})(config);
