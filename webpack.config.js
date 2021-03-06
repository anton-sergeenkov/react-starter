const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
		publicPath: '/'
	},
	devServer: {
		contentBase: './dist',
		historyApiFallback: {
			disableDotRule: true
		},
		stats: 'errors-only',
		port: 3001
	},
	resolve: {
        extensions: ['.js', '.jsx']
    },
	module: {
		rules: [
			{
				test: /\.m?js|jsx$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					    plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			},
			{
				test: /\.(css|scss)/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
							localIdentName: '[name]__[local]__[hash:base64:5]',
							sourceMap: true
						}
					},
					{
					    loader: 'postcss-loader',
					    options: {
							config: { path: './postcss.config.js' },
					        sourceMap: true
					    }
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					},
				]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					},
				],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './public/index.html'}),
		new MiniCssExtractPlugin({
        	filename: '[name].css'
		})
	]
}
