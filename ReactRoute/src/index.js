import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));

if (module.hot) {
  module.hot.accept("./App", function() {
    const NewApp = require("./App");
    ReactDOM.render(<App />, document.querySelector("#root"));
  });
}
