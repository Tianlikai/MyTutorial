import React from "react";
import "./scss.scss";
import str from "./demo01";

import src from "./images/me.png";

export default class App extends React.Component {
  render() {
    throw new Error('jason')
    return (
      <div className="container">
        {str}
        <img src={src} alt="logo" />
      </div>
    );
  }
}
