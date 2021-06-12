const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {IgnorePlugin} = require("webpack");

const rootPath = path.resolve(__dirname, "..");
const rendererPath = path.resolve(rootPath, "renderer");
const distPath = path.resolve(rootPath, "dist");

module.exports = {
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		mainFields: ["main", "module", "browser"],
	},
	entry: path.resolve(rendererPath, "index.tsx"),
	target: "electron-renderer",
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				include: /renderer/,
				use: [{loader: "ts-loader"}],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	devServer: {
		contentBase: path.join(distPath, "renderer"),
		hot: true,
		port: 4000,
		publicPath: "/",
	},
	output: {
		path: path.resolve(distPath, "renderer"),
		filename: "js/[name].js",
		publicPath: "./",
	},
	plugins: [
		new HtmlWebpackPlugin({template: path.resolve(rendererPath, "index.html")}),
		new IgnorePlugin(/osx-temperature-sensor/)
	],
};
