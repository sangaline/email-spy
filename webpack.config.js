const webpack = require('webpack');
const path = require('path');
const env = require('./utils/env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const options = {
  entry: {
    bootstrap: 'bootstrap-loader',
    options: path.join(__dirname, 'src', 'js', 'options.js'),
    popup: path.join(__dirname, 'src', 'js', 'popup.js'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(ttf|eot|png)$/,
        loader: 'file-loader'
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['bootstrap', 'options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['bootstrap', 'popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src', 'icons'),
        to: 'icons',
      },
    ]),
    new WriteFilePlugin(),
  ],
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-eval-source-map';
}

module.exports = options;
