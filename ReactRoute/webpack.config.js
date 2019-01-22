const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|bmp)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      title: "demo",
      hash: true
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true, // 是否gzip压缩
    port: 8080,
    open: true
  }
};
