const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputPath = path.resolve(__dirname, "out");

module.exports = [
    {
        name: "extension",
        entry: {
            background: path.resolve(__dirname, "background", "index.ts"),
        },
        output: {
            filename: "[name].js",
            path: outputPath,
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [ ".tsx", ".ts", ".js" ],
        },
        plugins: [
            new webpack.DefinePlugin({
                ENV: JSON.stringify("extension"),
            }),
        ],
    },
    {
        name: "pages",
        entry: {
            popup: path.resolve(__dirname, "pages", "popup.tsx"),
        },
        output: {
            filename: "[name].js",
            path: path.join(outputPath, "pages"),
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [ ".tsx", ".ts", ".js" ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "VTT Observe",
                filename: "[name].html",
                template: path.resolve(__dirname, "pages", "popup.html"),
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify("pages"),
            }),
        ],
    },
];
