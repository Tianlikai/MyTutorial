const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const env = require("./env");
const devMode = env.DevMode === "development";

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: devMode ? "[name].js" : "[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: devMode ? env.FRONTEND : ""
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {},
  module: {
    rules: [
      {
        test: /\.js/,
        include: path.resolve("src"),
        exclude: /(node_modules|bower_components)/,
        use: ["happypack/loader?id=js"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader },
          { loader: "happypack/loader?id=css" }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|bmp)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            outputPath: "images/",
            publicPath: devMode ? `${env.FRONTEND}/images/` : ""
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: "js",
      loaders: ["babel-loader"]
    }),
    new HappyPack({
      id: "css",
      loaders: [
        { loader: "css-loader" },
        { loader: "postcss-loader" },
        { loader: "sass-loader" }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static", "dll.vendor.*")
      }
    ]),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../static/manifest.json")
    }),
    new webpack.DefinePlugin({
      __devMode__: env.DevMode
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      filename: "index.html",
      title: "demo",
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    historyApiFallback: true,
    compress: true, // 是否gzip压缩
    host: env.HOST,
    port: env.PORT,
    inline: env.INLINE,
    hot: env.HOT,
    open: true
  }
};
