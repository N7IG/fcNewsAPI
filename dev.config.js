const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: "./scripts/main.js",
    mode: "development",
    watch: true,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        chunkFilename: "./chunks/[name].js",
        publicPath: "dist"
    },
    plugins: [new CleanWebpackPlugin(["dist"])],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: "babel-loader" },
                    { loader: "log-class-loader" }
                ]
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "./images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolveLoader: {
        modules: ["node_modules", path.resolve(__dirname, "loaders")]
    }
};
