const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/polyfill");

module.exports = {
    mode: 'development',
    entry: [
      '@babel/polyfill', './src/js/game.js'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js'
    },
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html',
      })
    ]
  };

