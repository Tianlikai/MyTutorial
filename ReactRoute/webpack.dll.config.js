const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vendor: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "dll.[name].js",
    library: "dll_[name]_js"
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: "dll_[name]_js",
      path: path.resolve(__dirname, "static/manifest.json")
    })
  ]
};
