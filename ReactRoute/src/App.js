import React, { Component } from "react";
// import { Route, Link } from "react-router-dom";

import { Route, Link, Switch } from "./router/react-router-dom/index";

import Home from "./Home";

const Manage = props => {
  console.log(props);
  return <div>用户管理</div>;
};
const Manage2 = props => {
  console.log(props);
  return <div>用户管理2</div>;
};
const Profile = props => {
  console.log(props);
  return <div>个人设置</div>;
};

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <ul className="link-wrap">
            <li>
              <Link to="/home">首页</Link>
            </li>
            <li>
              <Link to="/manage">用户管理</Link>
            </li>
            <li>
              <Link>个人设置</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/manage" component={Manage} />
          <Route path="/manage" component={Manage2} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}
