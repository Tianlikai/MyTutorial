const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vendor: ["prop-types", "react", "react-dom", "react-router-dom"]
  },
  output: {
    path: path.resolve(__dirname, "../static"),
    filename: "dll.[name].js",
    library: "dll_[name]_js"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "dll_[name]_js",
      path: path.resolve(__dirname, "../static/manifest.json")
    })
  ]
};
