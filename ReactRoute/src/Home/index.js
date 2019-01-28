import React, { Component } from "react";
import { Route, Link } from "../router/react-router-dom";

import "./style.scss";

const A = props => {
  console.log(props);
  return <div>this is a </div>;
};
const B = () => <div>this is b </div>;

export default class Home extends Component {
  render() {
    return (
      <div className="home-wrap">
        <ul className="link-wrap">
          <li>
            <Link to="/home/a">to a </Link>
          </li>
          <li>
            <Link to="/home/b">to b</Link>
          </li>
        </ul>
        <div>this is home</div>
        <Route path="/home/a/:id" component={A} />
        <Route path="/home/b" component={B} />
      </div>
    );
  }
}
