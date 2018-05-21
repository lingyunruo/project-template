const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('../assets/common/javascript/vendor-manifest.json');

let theme = require('../src/common/style/theme');

let webpackConfig = {
	entry: {
		'candidate-list/index': path.join(__dirname, '../src/candidate-list/entry/index.js'),
		'candidate-detail/index': path.join(__dirname, '../src/candidate-detail/entry/index.js')
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '../assets'),
		publicPath: "http://www.lgstatic.com:9000"
	},
	devtool: false,
	watch: true,
	module: {
		rules: [{
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react'],
					plugins: [
						['import', {
							"libraryName": "antd",
							"style": true
						}]
					]
				}
			}
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						localIdentName: '[local]'
					}
				}, {
					loader: 'less-loader',
					options: {
						sourceMap: true,
						modifyVars: theme,
						javascriptEnabled: true
					}
				}]
			}),
		}, {
			test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
			use: [{
				loader: "url-loader",
				options: {
					limit: 1024,
					fallback: 'file-loader'
				}
			}]
		}]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.DllReferencePlugin({
			manifest: manifest
		}),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};

module.exports = webpackConfig;
