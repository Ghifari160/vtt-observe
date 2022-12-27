const path = require("path");

const webpack = require("webpack");

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
];
