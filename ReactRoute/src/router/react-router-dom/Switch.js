import React, { Component } from "react";
import PathToRegexp from "path-to-regexp";
import PropTypes from "prop-types";

export default class Switch extends Component {
  static contextTypes = {
    location: PropTypes.object
  };

  render() {
    const { children } = this.props;
    const {
      location: { pathname }
    } = this.context;
    for (let i = 0; i < children.length; i += 1) {
      let child = children[i];
      const { path } = child.props;
      const regexp = PathToRegexp(path, [], { end: false });
      if (regexp.test(pathname)) {
        return child;
      }
    }
    return null;
  }
}
