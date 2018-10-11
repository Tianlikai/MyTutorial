import React from "./React";

// React.render("hello world", document.getElementById("root"));

var HelloMessage = React.createClass({
  getInitialState: function() {
    return {
      type: "say "
    };
  },
  changeType: function() {
    this.setState({
      type: "running"
    });
  },
  render: function() {
    return React.createElement(
      "div",
      {
        onclick: this.changeType
      },
      this.state.type,
      "Hello",
      this.props.name
    );
  }
});

const entry = React.createElement(HelloMessage, { key: "entry", name: "John" });
const root = document.getElementById("root");
React.render(entry, root);
