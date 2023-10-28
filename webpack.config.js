const path = require('path')
const webpack = require('webpack')
module.exports = {
	entry: './client/src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'client', 'public')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map',

	devServer: {
		static: path.join(__dirname, 'client', 'public'), // Specify the directory to serve static files
		client: {
			overlay: true // Show overlay with build errors in the browser
		},
		hot: true, // Enable hot module reloading
		port: 8000 // Specify the port to run the dev server
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}
