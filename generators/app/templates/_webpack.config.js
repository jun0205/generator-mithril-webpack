var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		/*===== yeoman entry hook =====*/
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	plugins: [
		new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
        	/*===== yeoman provide plugin hook =====*/
        	m: 'mithril'
        })
	],
	module: {
		loaders: [
			// ES6 transpiler
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			// Static files
			{
				test: /\.html$/,
				loader: 'static'
			},
			// Image files
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url?limit=8192'
			},
      // CSS files
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
			// LESS compiler
      {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
			// Font files
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
		]
	}
}