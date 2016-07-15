'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');

//var mdPath = path.resolve(__dirname, '.', 'md');
//
//var mdfiles = fs.readdirSync(mdPath).filter(function (file) {
//return !fs.statSync(path.join(mdPath, file)).isDirectory();
//});
//
//mdfiles.forEach(function (fileName) {
//if(fileName.substr(-3)==='.md'){
//	console.log(fileName);
//}
//}); 

module.exports = {
	entry: ['./js/index.js'],
	output: {
		filename: './js/index_bundle.js'
	},
	plugins: [
		new HtmlPlugin({
			filename: 'index.html',
			template: './js/template.html',
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
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}]
	}
};