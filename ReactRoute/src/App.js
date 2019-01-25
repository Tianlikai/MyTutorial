import React from "react";
import "./scss.scss";
import str from "./demo01";

import src from "./images/me.png";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="name">{str}</div>
        <div className="btn">click me</div>
        <img src={src} alt="logo" />
      </div>
    );
  }
}
