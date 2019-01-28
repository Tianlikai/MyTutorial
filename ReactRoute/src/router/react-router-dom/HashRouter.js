import React, { Component } from "react";
import PropTypes from "prop-types";

export default class HashRouter extends Component {
  static childContextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.object])
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const render = () => {
      this.setState({});
    };
    window.addEventListener("hashchange", render);
  }

  componentWillMount() {
    window.location.hash = window.location.hash || "/";
  }

  getChildContext() {
    return {
      location: {
        pathname: window.location.hash.slice(1) || "/"
      },
      history: {
        push(path) {
          window.location.hash = path;
        }
      }
    };
  }

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
