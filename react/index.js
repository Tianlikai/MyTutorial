import React from "./React";

/**
 * ReactDOMTextComponent组件
 */
// var TextComponent = "hello world!";
// var root = document.getElementById("container");

// React.render(TextComponent, root);

/**
 * ReactDOMComponent组件
 */
function sayHello() {
  alert("hello");
}
var div = React.createElement("div", {}, "jason");
var DOMComponent = React.createElement(
  "div",
  { key: "jason", age: 22, onclick: sayHello },
  "hello worlds!",
  div
);
var root = document.getElementById("container");
React.render(DOMComponent, root);

export default React;
