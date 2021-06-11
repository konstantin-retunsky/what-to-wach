const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
	return {
		entry: {
			app: "./src/index.js"
		},
		output: {
			filename: "bundle.js",
			path: path.resolve(__dirname, "build"),
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
				{
					test: /.(css|scss|sass)$/,
					use: [
						argv.mode === "production"
							? MiniCssExtractPlugin.loader
							: "style-loader",
						"css-loader",
						"sass-loader",
					],
				},
			],
		},
		resolve: {
			extensions: [".js", ".jsx"],
		},
		devtool: "source-map",
		plugins: [
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				inject: "body",
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css",
			}),
			new webpack.ProgressPlugin(),
			new CleanWebpackPlugin(),
		],
		devServer: {
			contentBase: path.join(__dirname, "build"),
			https: true,
			port: 3000,
			open: true,
			hot: true,
		},
	};
};
