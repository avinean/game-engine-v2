const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/clicker/assets", to: "./" },
      ],
    }),
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  devtool: 'inline-source-map',
};

