/**
 * Created by Administrator on 2017/11/14.
 */

var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

// 常用路径
var ROOT_PATH = path.join(__dirname);
var APP_PATH = path.join(ROOT_PATH, 'js');
var BUILD_PATH = path.join(ROOT_PATH, 'assets')

module.exports = {
	devtool: 'cheap-source-map',
	//页面入口文件配置
	entry: {
		index: [
			'babel-polyfill',
			'webpack-dev-server/client?http://192.168.21.166:5000',
			'react-hot-loader/patch',
			'./js/entry.js'
		]
		// vendor: ['react']
	},
	//入口文件输出配置
	output: {
		publicPath: '/assets/',
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module: {
		//加载器配置
		rules: [
			{
				test: /\.(woff|svg|eot|ttf)\??.*$/,
				use: ['url-loader?name=[name].[md5:hash:hex:7].[ext]'],
				exclude: /node_modules/
			},
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({fallback: 'style-loader',use:"css-loader!postcss-loader!sass-loader"}),
				exclude: /node_modules/
			},
			{
				test: /\.(css|less)$/,
				use: ExtractTextPlugin.extract({fallback: 'style-loader',use:"css-loader!postcss-loader!less-loader"}),
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg)$/,
				use: ['url-loader?limit=8192&name=css/images/[hash:8].[name].[ext]'],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: ['jsx-loader?harmony'],
				exclude: /node_modules/
			},
			{
				test: /\.js|jsx$/,
				use: [{
					loader: "react-hot-loader/webpack"
				},{
					loader: "babel-loader",
					options: {
						presets: [
							["es2015", {"modules": false}],
							"stage-3",
							"react"
						],
						cacheDirectory: true,
						plugins: 'react-hot-loader/babel'
					}
				}],
				exclude: /node_modules/
			}
		]
	},
	//其它解决方案配置
	resolve: {
		extensions: ['.js', '.json', '.less', '.scss'],
		alias: {
			styles: path.join(__dirname, 'css')
		}
	},
	devServer: {
		hot: true,
		inline: true,
		contentBase: ROOT_PATH,
		port: '5000',
		disableHostCheck: true
	},
	//插件项
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('css/style.css'),
		// new webpack.LoaderOptionsPlugin({
		// 	options: {
		// 		devServer: {
		// 			contentBase: ROOT_PATH, //本地服务器所加载的页面所在的目录
		// 			colors: true, //终端中输出结果为彩色
		// 			historyApiFallback: true, //不跳转
		// 			inline: true //实时刷新
		// 		}
		// 	}
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "vendor",
		// 	filename:"vendor.js",
		// 	minChunks: Infinity
		// }),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json'),
		}),
		new BabiliPlugin({},{
			test: /\.js|jsx$/,
			comments: false,
			sourceMap: false,
			babel: require("babel-core"),
			babili: require("babel-preset-babili")
		})
	]
};