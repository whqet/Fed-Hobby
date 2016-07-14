'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');

  module.exports = {
    entry: ['./index.js'],
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlPlugin({
        filename: 'index.html',
        template: 'template.html',
        hash: true,
        inject: 'body'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
      })
    ],
    module: {
      loaders: [{
        test: /\.json$/,
        loader: "json-loader"
      },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }]
    }
  };