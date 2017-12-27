/**
 * Created by Administrator on 2017/11/21.
 */

const webpack = require('webpack');
var path = require('path');

const vendors = [
	'react',
	'react-dom',
	'react-router'
];

module.exports = {
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: '[name].js',
		library: '[name]',
	},
	entry: {
		"vendor_lib": vendors,
	},
	plugins: [
		new webpack.DllPlugin({
			path: 'manifest.json',
			name: '[name]',
			context: __dirname,
		})
	],
};