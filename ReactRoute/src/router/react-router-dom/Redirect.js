import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Redirect extends Component {
  static contextTypes = {
    history: PropTypes.object
  };

  static propTypes = {
    to: PropTypes.string
  };

  componentDidMount() {
    const { to } = this.props;
    const { history } = this.context;
    history.push(to);
  }

  render() {
    return null;
  }
}
