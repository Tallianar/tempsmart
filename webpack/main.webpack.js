const path = require("path");

const rootPath = path.resolve(__dirname, "..");
const distPath = path.resolve(rootPath, "dist");
const mainPath = path.resolve(rootPath, "main");

module.exports = {
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	devtool: "source-map",
	entry: path.resolve(mainPath, "index.ts"),
	target: "electron-main",

	module: {
		rules: [
			{
				test: /\.ts$/,
				include: /main/,
				use: [{ loader: "ts-loader" }],
			},
		],
	},
	node: {
		__dirname: false,
	},
	output: {
		path: distPath,
		filename: "[name].js",
	},
};
