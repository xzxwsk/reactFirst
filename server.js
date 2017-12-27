/**
 * Created by Administrator on 2017/11/14.
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');
const ROOT_PATH = path.join(__dirname);

new WebpackDevServer(webpack(config), {
	publicPath: ROOT_PATH,
	hot: true,
	headers: { 'Access-Control-Allow-Origin': '*' },
	noInfo: false,
	historyApiFallback: true
}).listen(5000, '192.168.21.166', function (err, result) {
	if (err) {
		console.log(err);
	}
	console.log('Listening');
});