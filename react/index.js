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
// function sayHello() {
//   alert("hello");
// }
// var div = React.createElement("div", {}, "jason");
// var DOMComponent = React.createElement(
//   "div",
//   { key: "jason", age: 22, onclick: sayHello },
//   "hello worlds!",
//   div
// );
// var root = document.getElementById("container");
// React.render(DOMComponent, root);

/**
 * ReactCompositeComponent组件
 */
var CompositeComponent = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentWillMount: function() {
    console.log("声明周期: " + "componentWillMount");
  },
  componentDidMount: function() {
    console.log("声明周期: " + "componentDidMount");
  },
  render: function() {
    var h1 = React.createElement("h1", null, "hello world!");
    var h2 = React.createElement("h2", null, "this is React");
    var children = [h1, h2];

    return React.createElement("div", null, children);
  }
});

var CompositeElement = React.createElement(CompositeComponent, {
  name: "jason",
  age: 22
});

var root = document.getElementById("container");

React.render(CompositeElement, root);

export default React;
