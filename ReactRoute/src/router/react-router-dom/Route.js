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
    this.state = {
      path: "",
      keys: [],
      regexp: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.path !== state.path) {
      let keys = [];
      return {
        path: props.path,
        regexp: PathToRegexp(props.path, keys, { end: false }),
        keys: keys.map(key => key.name)
      };
    }
    return null;
  }

  render() {
    const { component: Component } = this.props;
    const { location, history } = this.context;
    const { pathname } = location;

    const { path, keys, regexp } = this.state;

    let result = pathname.match(regexp);
    if (result) {
      const [url, ...values] = result;
      const params = keys.reduce((memo, key, idx) => {
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
