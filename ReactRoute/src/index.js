const str = require("./demo01");
require("./css.css");
require("./scss.scss");

const src = require("./images/me.png");
const img = new Image();
img.src = src;

document.body.appendChild(img);
document.querySelector("#root").innerHTML = str;
document.querySelector("#container").innerHTML = str;
