import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Link extends Component {
  static contextTypes = {
    history: PropTypes.object
  };

  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.element
  };

  static defaultProps = {
    to: "/"
  };

  render() {
    const { to, children } = this.props;
    const { history } = this.context;
    return <a onClick={() => history.push(to)}>{children}</a>;
  }
}
