const webpack = require("webpack");
let webpackConfig = require("./webpack.config");

if (process.env.NODE_ENV === "development") {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
}

module.exports = webpackConfig;
