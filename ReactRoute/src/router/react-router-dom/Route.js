import React, { Component } from "react";
import PropTypes from "prop-types";
import PathToRegexp from "path-to-regexp";

export default class Route extends Component {
  static contextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  static propTypes = {
    path: PropTypes.string
  };

  constructor(props) {
    super(props);
    const { path } = props;
    this.keys = [];
    this.regexp = PathToRegexp(path, this.keys, { end: false });
    this.keys = this.keys.map(key => key.name);
  }

  render() {
    const { path, component: Component } = this.props;
    const { location, history } = this.context;
    const { pathname } = location;

    let result = pathname.match(this.regexp);
    if (result) {
      const [url, ...values] = result;
      const params = this.keys.reduce((memo, key, idx) => {
        memo[key] = values[idx];
        return memo;
      }, {});
      const match = {
        url,
        path,
        params
      };
      return <Component history={history} location={location} match={match} />;
    } else return null;
  }
}
