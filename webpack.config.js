const path = require("path");

module.exports = {
    entry: "./content/index.ts",
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
    output: {
        filename: "content.js",
        path: path.resolve(__dirname, "out", "content")
    },
};
