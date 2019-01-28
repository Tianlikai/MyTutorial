import React from "react";
import ReactDOM from "react-dom";
// import { HashRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "./router/react-router-dom/index";

import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);

if (module.hot) {
  module.hot.accept("./App", function() {
    const NewApp = require("./App");
    ReactDOM.render(
      <Router>
        <App />
      </Router>,
      document.querySelector("#root")
    );
  });
}
