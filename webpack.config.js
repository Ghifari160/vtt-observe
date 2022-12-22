const path = require("path");

module.exports = {
    entry: {
        background: "./background/index.ts",
        content: "./content/index.ts",
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
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "out")
    },
};
